import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BirdDetailSubtitles from '../BirdDetailSubtitles/BirdDetailSubtitles'
import FASIconButton from '../UI/Buttons/FASIconButton'
import BirdSubDetails from '../BirdSubDetails/BirdSubDetails'
import BirdLocation from '../BirdLocation/BirdLocation'
import { formatColors } from '../../Helpers/ColorsFomater'

const AllBirdDetails = ({ birdDetails }) => {
    const taxonomy = birdDetails.taxonomy;
    const locations = birdDetails.locations;
    const characteristics = birdDetails.characteristics;
    const formattedColor = formatColors(characteristics.color.trim());
    return (
        <ScrollView>
            <View>
                <BirdDetailSubtitles>
                    <FASIconButton color={"white"} icon={"feather"} size={15} />
                    {" "}
                    Bird Classification
                </BirdDetailSubtitles>
                {taxonomy?.kingdom && <BirdSubDetails name={"Kingdom"} details={taxonomy?.kingdom} type={"row"} />}
                {taxonomy?.class && <BirdSubDetails name={"Order"} details={taxonomy?.order} type={"row"} />}
                {taxonomy?.order && <BirdSubDetails name={"Order"} details={taxonomy?.order} type={"row"} />}
                {taxonomy?.family && <BirdSubDetails name={"Family"} details={taxonomy?.family} type={"row"} />}
                {taxonomy?.genus && <BirdSubDetails name={"Genus"} details={taxonomy?.genus} type={"row"} />}
                {taxonomy?.scientific_name && <BirdSubDetails name={"Scientific Name"} details={taxonomy?.scientific_name} type={"row"} />}
            </View>
            <View>
                <BirdDetailSubtitles>
                    <FASIconButton color={"white"} icon={"feather"} size={15} />
                    {" "}
                    Find Habitats
                </BirdDetailSubtitles>
                {locations && locations?.map((item, index) => (
                    <BirdLocation location={item} key={index} />
                ))}
            </View>
            <View>
                <BirdDetailSubtitles>
                    <FASIconButton color={"white"} icon={"feather"} size={15} />
                    {" "}
                    Characteristics
                </BirdDetailSubtitles>
                {characteristics?.name_of_young && <BirdSubDetails name={"Name Of Young"} details={characteristics?.name_of_young && characteristics.name_of_young.trim()} type={"column"} />}
                {characteristics?.group_behavior && <BirdSubDetails name={"Group Behavior"} details={characteristics?.group_behavior && characteristics.group_behavior.trim()} type={"column"} />}
                {characteristics?.estimated_population_size && <BirdSubDetails name={"Estimated Population Size"} details={characteristics?.estimated_population_size && characteristics.estimated_population_size.trim()} type={"column"} />}
                {characteristics?.biggest_threat && <BirdSubDetails name={"Biggest Threat"} details={characteristics?.biggest_threat && characteristics.biggest_threat.trim()} type={"column"} />}
                {characteristics?.gestation_period && <BirdSubDetails name={"Gestation Period"} details={characteristics?.gestation_period && characteristics.gestation_period.trim()} type={"column"} />}
                {characteristics?.habitat && <BirdSubDetails name={"Habitat"} details={characteristics?.habitat && characteristics.habitat.trim()} type={"column"} />}
                {characteristics?.diet && <BirdSubDetails name={"Diet"} details={characteristics?.diet && characteristics.diet.trim()} type={"column"} />}
                {characteristics?.common_name && <BirdSubDetails name={"Common Name"} details={characteristics?.common_name && characteristics.common_name.trim()} type={"column"} />}
                {characteristics?.number_of_species && <BirdSubDetails name={"Number Of Species"} details={characteristics?.number_of_species && characteristics.number_of_species.trim()} type={"column"} />}
                {characteristics?.group && <BirdSubDetails name={"Group"} details={characteristics?.group && characteristics.group.trim()} type={"column"} />}
                {characteristics?.color && <BirdSubDetails name={"Color"} details={characteristics?.color && formattedColor} type={"column"} />}
                {characteristics?.skin_type && <BirdSubDetails name={"Skin Type"} details={characteristics?.skin_type && characteristics.skin_type.trim()} type={"column"} />}
                {characteristics?.top_speed && <BirdSubDetails name={"Top Speed"} details={characteristics?.top_speed && characteristics.top_speed.trim()} type={"column"} />}
                {characteristics?.lifespan && <BirdSubDetails name={"Lifespan"} details={characteristics?.lifespan && characteristics.lifespan.trim()} type={"column"} />}
                {characteristics?.weight && <BirdSubDetails name={"Weight"} details={characteristics?.weight && characteristics.weight.trim()} type={"column"} />}
                {characteristics?.height && <BirdSubDetails name={"Height"} details={characteristics?.height && characteristics.height.trim()} type={"column"} />}
                {characteristics?.age_of_sexual_maturity && <BirdSubDetails name={"Age Of Sexual Maturity"} details={characteristics?.age_of_sexual_maturity && characteristics.age_of_sexual_maturity.trim()} type={"column"} />}
                {characteristics?.age_of_weaning && <BirdSubDetails name={"Age Of Weaning"} details={characteristics?.age_of_weaning && characteristics.age_of_weaning.trim()} type={"column"} />}

            </View>
        </ScrollView >
    )
}

export default AllBirdDetails

const styles = StyleSheet.create({
})