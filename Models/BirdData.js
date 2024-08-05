export class BirdData {
    constructor(date, file, fileType, location, id) {
        this.date = date;
        this.file = file;
        this.fileType = fileType;
        this.location = { lat: location.lat, lng: location.lng };//{lat:0.5151, lng:127.451}
        this.id = id;
    }
}