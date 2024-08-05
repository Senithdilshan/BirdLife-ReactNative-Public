import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import uuid from 'react-native-uuid';
import { CLOUDCONVERT_API_KEY, CLOUDCONVERT_API_URL } from "../env"
export const convertM4aToMp3 = async (fileUri) => {
    try {
        // Create a CloudConvert job
        const createJobResponse = await axios.post(CLOUDCONVERT_API_URL, {
            tasks: {
                'import-my-file': {
                    operation: 'import/upload'
                },
                'convert-my-file': {
                    operation: 'convert',
                    input: 'import-my-file',
                    output_format: 'mp3'
                },
                'export-my-file': {
                    operation: 'export/url',
                    input: 'convert-my-file'
                }
            }
        }, {
            headers: {
                'Authorization': `Bearer ${CLOUDCONVERT_API_KEY}`
            }
        });

        const uploadTask = createJobResponse.data?.data.tasks.find(task => task.name === 'import-my-file');
        // console.log("Response created" + uploadTask.result.form.url);

        const uploadFormData = new FormData();
        const uniqueFileName = `file-${uuid.v4()}.m4a`;
        const parameters = uploadTask.result.form.parameters;

        uploadFormData.append('acl', parameters.acl);
        uploadFormData.append('key', parameters.key.replace('${filename}', uniqueFileName));
        uploadFormData.append('success_action_status', parameters.success_action_status);
        uploadFormData.append('X-Amz-Credential', parameters['X-Amz-Credential']);
        uploadFormData.append('X-Amz-Algorithm', parameters['X-Amz-Algorithm']);
        uploadFormData.append('X-Amz-Date', parameters['X-Amz-Date']);
        uploadFormData.append('Policy', parameters.Policy);
        uploadFormData.append('X-Amz-Signature', parameters['X-Amz-Signature']);
        uploadFormData.append('file', {
            uri: fileUri,
            name: uniqueFileName,
            type: 'audio/m4a'
        });
        try {
            const uploadResponse = await axios.post(uploadTask.result.form.url, uploadFormData, {
                headers: {
                    'Authorization': `Bearer ${CLOUDCONVERT_API_KEY}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            // console.log("uploadResponse created", uploadResponse.data);
            const jobId = createJobResponse.data.data.id;
            console.log('Job ID:', jobId);

            // Wait for the job to complete
            let jobStatusResponse;
            do {
                jobStatusResponse = await axios.get(`${CLOUDCONVERT_API_URL}/${jobId}`, {
                    headers: {
                        'Authorization': `Bearer ${CLOUDCONVERT_API_KEY}`
                    }
                });
                await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds before checking status again
            } while (jobStatusResponse.data.data.status !== 'finished');

            const exportTask = jobStatusResponse.data.data.tasks.find(task => task.name === 'export-my-file');

            const mp3FileUrl = exportTask.result.files[0].url;

            // Download the converted mp3 file
            const mp3File = await FileSystem.downloadAsync(mp3FileUrl, FileSystem.documentDirectory + 'file.mp3');

            return mp3File.uri;
        } catch (error) {
            throw new error
        }
    } catch (error) {
        console.error('Error converting file:', error);
        throw new error
    }
};
