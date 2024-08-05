const birdData = {
    "amerob": "American Robin",
    "barswa": "Barn Swallow",
    "bewwre": "Bewick's Wren",
    "blujay": "Blue Jay",
    "bncfly": "Blackcapped Flycatcher",
    "carwre": "Carolina Wren",
    "compau": "Pauraque",
    "comrav": "Raven",
    "comyel": "Yellowthroat",
    "eursta": "European Starling",
    "gbwwre1": "Great Basin Wood Nymph",
    "grekis": "Great Kiskadee",
    "houspa": "House Sparrow",
    "houwre": "House Wren",
    "mallar3": "Mallard",
    "norcar": "Northern Cardinal",
    "normoc": "Northern Mockingbird",
    "redcro": "Red Crossbill",
    "rewbla": "Redwinged Blackbird",
    "roahaw": "Roadside Hawk",
    "rubpep1": "Rubythroated Hummingbird",
    "rucspa1": "Rufouscollared Sparrow",
    "sonspa": "Song Sparrow",
    "spotow": "Spotted Towhee",
    "wbwwre1": "Whitebrowed Wood Wren",
    "wesmea": "Western Meadowlark",
    "yeofly1": "Yellowolive Flycatcher"
};

export const getCommonName = (primaryLabel) => {
    return birdData[primaryLabel] || "Unknown Bird";
}
