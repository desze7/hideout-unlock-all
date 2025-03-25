class UnlockHideoutCustomizationMod {
    postDBLoad(container) {
        const logger = container.resolve("WinstonLogger");
        const databaseServer = container.resolve("DatabaseServer");

        const database = databaseServer.getTables();

        if (!database.hideout || !database.hideout.customisation || !database.hideout.customisation.globals) {
            logger.error("Hideout customization data is missing or improperly structured.");
            return;
        }

        const customisations = database.hideout.customisation.globals;

        // 'customisation.json' name : in game name
        const customisationsToUnlock = [
            "675468d8c6e063d76309c60f", // Ceiling_Wallpaper : Dirty
            "675468bdb784110b2702fe13", // Ceiling_Street : Factory
            "675468cb43b934b1a7089ad7", // Ceiling_Strucco : Gray
            "675843aef98f37560b029094", // Ceiling_Kindergarten : Sunshine
            "675468937dadca6836092b2a", // Ceiling_Loft : White
            "675466d57dadca6836092b26", // Floor_Wallpaper : English Herringbone
            "675466a8215930ae4c03ac54", // Floor_Street : Factory
            "6754666c76e1f2b24c0cc956", // Floor_Loft : Laminate
            "6754662cc6e063d76309c607", // Floor_Linolium : Linoleum
            "675466825b7ebafefd0ebc2c", // Floor_Prestige : Luxury
            "675466ea8b3797a0e8038bd2", // Floor_WoodPlane : Parquet
            "675466bcc6e063d76309c609", // Floor_Tile : Small Tiles
            "675844580ec1f5ab030c8ff6", // Floor_Kindergarten : Synthetic Grass
            "675467728b3797a0e8038bd4", // Wall_Blue : Blue
            "675467aa81067119a10938cb", // Wall_Loft : Brick
            "675467e643b934b1a7089ad3", // Wall_Street : Factory
            "675467f4c6e063d76309c60d", // Wall_Wallpaper : Modest Wallpaper
            "675467bb5b7ebafefd0ebc2e", // Wall_Orange : Orange
            "675467c924c9a7ccb509d62f", // Wall_Prestige : Quiet Luxury
            "675467d8b784110b2702fe11", // Wall_Red : Red
            "675844d50ec1f5ab030c8ff8", // Wall_Kindergarten : Tranquility
            "67585bf5428877c04c038ee3", // Target_Bear : Bear
            "67585d161840a37ff10ebdd1", // Target_Boutle : Bottle
            "67585d2cd7a2703986067e99", // Target_Color1 : Colored
            "67585d6ab032beb9b5097e96", // Target_Duck : Duck
            "67585cf55ec257bf740a446f", // Target_Boar : Hog
            "675a99c17b193086ca09e8a9" // Target_White : Sports
        ];

        const nameMapping = {
            "Ceiling_Wallpaper": "Ceiling - Dirty",
            "Ceiling_Street": "Ceiling - Factory",
            "Ceiling_Strucco": "Ceiling - Gray",
            "Ceiling_Kindergarten": "Ceiling - Sunshine",
            "Ceiling_Loft": "Ceiling - White",
            "Floor_Wallpaper": "Floor - English Herringbone",
            "Floor_Street": "Floor - Factory",
            "Floor_Loft": "Floor - Laminate",
            "Floor_Linolium": "Floor - Linoleum",
            "Floor_Prestige": "Floor - Luxury",
            "Floor_WoodPlane": "Floor - Parquet",
            "Floor_Tile": "Floor - Small Tiles",
            "Floor_Kindergarten": "Floor - Synthetic Grass",
            "Wall_Blue": "Walls - Blue",
            "Wall_Loft": "Walls - Brick",
            "Wall_Street": "Walls - Factory",
            "Wall_Wallpaper": "Walls - Modest Wallpaper",
            "Wall_Orange": "Walls - Orange",
            "Wall_Prestige": "Walls - Quiet Luxury",
            "Wall_Red": "Walls - Red",
            "Wall_Kindergarten": "Walls - Tranquility",
            "Target_Bear": "Targets - Bear",
            "Target_Boutle": "Targets - Bottle",
            "Target_Color1": "Targets - Colored",
            "Target_Duck": "Targets - Duck",
            "Target_Boar": "Targets - Hog",
            "Target_White": "Targets - Sports"
        };

        let patchedCount = 0;

        for (const itemId of customisationsToUnlock) {
            const item = customisations.find(c => c.itemId === itemId);

            if (item) {
                item.conditions = [];
                item.isEnabled = true;

                const formatName = (systemName) => {
                    if (!systemName) return "Unknown Customization.";
                    const parts = systemName.split("_");
                    if (parts.length === 2) {
                        return `${parts[1]} ${parts[0]}`;
                    }
                    return parts.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
                };

                const itemName = nameMapping[item.systemName] || formatName(item.systemName);

                logger.success(`Customization patched: ${itemName}`);
                patchedCount++;
            }
        }

        if (patchedCount > 0) {
            logger.success(`- Successfully patched ${patchedCount} hideout customizations!`);
        } else {
            logger.info("No matching customizations found to patch.");
        }
    }
}

module.exports.mod = new UnlockHideoutCustomizationMod();
