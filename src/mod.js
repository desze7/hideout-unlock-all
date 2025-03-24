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

        const customisationsToUnlock = [
            "675844d50ec1f5ab030c8ff8",
            "675466ea8b3797a0e8038bd2",
            "675468bdb784110b2702fe13",
            "675466bcc6e063d76309c609",
            "675844580ec1f5ab030c8ff6",
            "67585d6ab032beb9b5097e96",
            "67585d161840a37ff10ebdd1",
            "675843aef98f37560b029094",
            "675467d8b784110b2702fe11",
            "675467bb5b7ebafefd0ebc2e",
            "675466a8215930ae4c03ac54",
            "67585cf55ec257bf740a446f",
            "675468cb43b934b1a7089ad7",
            "675466d57dadca6836092b26",
            "67585bf5428877c04c038ee3",
            "6754666c76e1f2b24c0cc956",
            "675466825b7ebafefd0ebc2c",
            "675467728b3797a0e8038bd4",
            "675a99c17b193086ca09e8a9",
            "675468d8c6e063d76309c60f",
            "675468937dadca6836092b2a",
            "675467aa81067119a10938cb",
            "675467c924c9a7ccb509d62f",
            "675467e643b934b1a7089ad3",
            "6754662cc6e063d76309c607",
            "675467f4c6e063d76309c60d",
            "67585d2cd7a2703986067e99"
        ];

        let patchedCount = 0;

        for (const item of customisations) {
            if (customisationsToUnlock.includes(item.itemId)) {
                item.conditions = [];
                item.isEnabled = true;
                logger.success(`Hideout Customization Patched: ${item.itemId}`);
                patchedCount++;
            }
        }

        if (patchedCount > 0) {
            logger.success(`Successfully patched ${patchedCount} hideout customizations!`);
        } else {
            logger.info("No matching customizations found to patch.");
        }
    }
}

module.exports.mod = new UnlockHideoutCustomizationMod();
