/*
 * SniAds Library Configuration
 * Version 62
 * Modified: Wed Jul 22 2015 at 13:15:04 GMT-0400 (EDT)
 * Provided by SNI Technical Ad Operations Group 
 * Notes: Added main_ing to targeting set.
 */
/**
* SniAds Global Configuration
*
* Maintained by Technical Ad Operations Group
*
* Last Updated: Fri May 29 11:54:20 2015 - added mapping set for new gallery unit. only display on mobile.
**/

// Define SniAds namespace
(function() {
    window.SniAdsConfig = window.SniAdsConfig || {};
})();


/**
 * SniAds global configuration object. Maintained by Ad Operations Departments. Local site configuration can override
 * most values via SniAds.init(siteConfig). The library will ignore any settings that are not settable at the site level.
 * @namespace SniAdsConfig
 * @type {Object}
 */
SniAdsConfig = {
    /* DFP server to use. production|staging */

    /**
     * @property {string} env Determines which DFP network to use. Additional configurations are based on this. In
     * production, the Google Console is disabled and any logging or debugging functionality is removed.
     * @memberOf SniAdsConfig
     */
    "env" : "production",

    /**
     * Allows overriding the environment setting for a specific site value. Use the KVP value of site as the key. *Not the mdManager
     * value, but the value after SniAds has initialized and any value adjustments have occured. Sites will still need to use
     * the dfpEnv option in SniAds.init for additional environments like QA and Dev if they differ from the prod setting.
     *
     * If a site has set the environment in the SniAds.init call, the environment setting can be forced from here, by prepending the value
     * with an explamation point. However, the dfpenv url flag is not affected and can still be used to set the environment on a per page basis.
     *
     * Eg: !staging or !production
     *
     */
    "envSite": {
        "hgtv": "production",
        "door": "production",
        "grdn": "production",
        "travel": "production",
        "diy": "production"
    },

    /**
     * Site value remappings to handle sites that use site value variants that we need mapped back to the primary site value. ie hgtv-photos => hgtv
     * If a site is passing the wrong value, just add the current value to the correct site set. You can add new site sets if needed too.
     */
    "siteValueMappings": {
        "hgtv": ["hgtv-com","hgtv-videos","hgtv-people","hgtv-photos","hgtv-search","hgtv_com","hgtv_videos","hgtv_people","hgtv_photos","hgtv_search","home"],
        "gac": ["gac-people"],
        "diy": ["diy-people"]
    },

    /**
     * Sites that the mobile gallery adhesion 320x50 can run on. The gallery must be based on the HGTV setup. Library changes may
     * be required when adding sites.
     */
    "allowMobileAdhesion": ["hgtv", "diy", "gac", "food"],


    /**
     * If true, DFP will not count impressions. Useful for testing.
     * @todo Not implemented yet.
     */
    "noCount": false,

    /**
     * If true, the hierarchy will use the section placeholders (l1o, l2o, l3o, l4o, l5o) to fill out a complete hierarchy. By default, the ad unit will
     * terminate at the last available section.
     */
    "fillPartialHierarchy": false,

    /**
    * An array of any values that should be removed from any key values before slots are created. (ie Paula Deen)
    * Values will be replaced with jjydnat and have house ads targeted to it.
    * *** NOTE *** THIS IS CURRENTLY DISABLED ****
    **/
    "restrictedValues": ["paula dean", "pauladean", "paula_dean"],


    /**
     * Array of all key-values we are interested in for custom targeting. Some sites have a ton of data so we must limit what we use to a subset to avoid maxing out the ad call. The max character limit for a DFP ad url is 2,000 characters. Keys are case-insensitive.
     */
    "targetingKeys": [
        "pagetype",
        "uniqueid",
        "topic",
        "keyterm",
        "adkey1",
        "talentName",
        "showName",
        "keyword",
        "contenttag1",
        "contenttag2",
        "referrer",
        "category",
        "photocount",
        "vgncontent",
        "show_abbr",
        "sniads_regression_test",
        "ing",
        "scripps160",
        "scripps250",
        "scripps600",
        "scripps728",
        "scripps320",
        "cs_debug",
        "subsection",
        "subsection1",
        "subsection2",
        "subsctn1",
        "subsctn2",
        "url",
        "source",
        "livingsource",
        "orntn",
        "version",
        "sbi_apoc",
        "sbi_size",
        "sbi_dozer",
        "glist",
        "mcid",
        "aam_fw",
        "main_ing"
    ],

    /**
     * Array of the flags to use from Criteo.
     */
    "criteoFlags": ["scripps160", "scripps250", "scripps600", "scripps728", "scripps320"],

    /**
     * Array of dynamic key values to use in targeting. These are single key values that contain multiple values that are parsed into individual kvps.
     * Example: dimensionvalues
     */
    "dynamicTargetSets": ["dimensionvalues"],

    /**
     * An array of cookies to read into KVP. If you want them to be targeted, set it in the targetingKeys array also.
     */
    "cookies": ["aam_fw", "AMCV_BC501253513148ED0A490D45@AdobeOrg"],

    /**
     * The following are keys that have multiple value that we need to pass to DFP as an array. Each entry has 3 settings:
     * The mdKey on the site.
     * The separator to use.
     * New dfpKey (default is the initial key)
     * Clean Should the value be passed through clean value process.
     */
    "multiKeys": [
        {
            mdKey: "MAININGREDIENT",
            separator: ",",
            dfpKey: "main_ing",
            clean: true
        }
    ],

    /**
     * Some sites handle multi word value differently. For DFP they must be converted to array. Set the split character for each site below.
     * As most sites use a space, that is the default. As a result, only sites not using spaces must be set here, but you may add all if you want.
     * While care has been taken to work out of the box, this allows control if needed.
     * When setting, key must match site key value. Eg: Food.com = foodcom
     */
    "keySettings": {
        "keytermSplit": {
            "foodcom": "+"
        },
        // The following allows overridding the key used for DFP keys. For example, if a site uses pageSearchTerms instead of keyterm, you can override the keyterm key to use the value of pageSearchTerms. NOTE: If you set a override, and the value does not exists, a blank value will be used. It will NOT revert to tryng the default.
        // DO NOT REMOVE ANY OF THESE
        // Ex: { "food": "newkey"} // use newkey instead of default key
        "override_pagetype": {},
        "override_adkey1": {},
        "override_keywords": {},
        "override_topic": {},
        "override_talentname": {},
        "override_showname": {},
        "override_uniqueid": {}
    },

    /**
     * DFP custom targeting values may not contain the following characters. During init, these are stripped out.
     */
    "invalidChars": "#\",*.()=+<>[]| ",

    /**
     * These charcters are "safe", but must be encoded before being use in DFP targeting.
     */
    "encodeChars": "$-_.",


    /**
     * Set GPT settings here.
     */
    "gptSettings": {
        "collapseEmptyDivs": true,
        "singleRequestMode": true,
        "centerAds": true
    },

    /**
     * Define all possible ad slots. This is used when scanning a page for the ad hooks. Every possible ad tag should be listed here.
     */
    "adSlots" : [
        {
            "tag": "dfp_bigbox",
            "sizes": [[300, 250],[300, 600],[300, 1050]],
            "mapping":{
                "small": [300,250],                         // small = ( phone )
                "medium": [300,250],                         // medium = ( phablet )
                "large": [[300,250],[300,600],[300,1050]],   // large = ( tablet )
                "xlarge": [[300,250],[300,600],[300,1050]]   // exlarge = ( laptop/desktop monitor )
            }
        },  {
            "tag": "dfp_bigbox_2",
            "sizes": [[300, 250],[300, 600],[300, 1050]],
            "mapping":{
                "small": [300,250],                         // small = ( phone )
                "medium": [300,250],                         // medium = ( phablet )
                "large": [[300,250],[300,600],[300,1050]],   // large = ( tablet )
                "xlarge": [[300,250],[300,600],[300,1050]]   // exlarge = ( laptop/desktop monitor )
            }
        },  {
            "tag": "dfp_bigbox_3",
            "sizes": [[300, 250],[300, 600],[300, 1050]],
            "mapping":{
                "small": [300,250],                         // small = ( phone )
                "medium": [300,250],                         // medium = ( phablet )
                "large": [[300,250],[300,600],[300,1050]],   // large = ( tablet )
                "xlarge": [[300,250],[300,600],[300,1050]]   // exlarge = ( laptop/desktop monitor )
            }
        },  {
            "tag": "dfp_leaderboard",
            "sizes": [[728, 90], [970,90], [970,250]],
            "mapping":{
                "small": [320,50],  // small = ( phone )
                "medium": [[728, 90], [970,90], [970,250]],   // medium = ( phablet )
                "large": [[728, 90], [970,90], [970,250]],  // large = ( tablet )
                "xlarge": [[728, 90], [970,90], [970,250]] // exlarge = ( laptop/desktop monitor )
            }
        },  {
            "tag": "dfp_leaderboard_body",
            "sizes": [728, 90],
            "mapping":{
                "small": [320,50],  // small = ( phone )
                "medium": [728,90],   // medium = ( phablet )
                "large": [728,90],  // large = ( tablet )
                "xlarge": [728,90] // exlarge = ( laptop/desktop monitor )
            }
        }, {
            "tag": "dfp_leaderboard_no_mobile",
            "sizes": [728, 90],
            "mapping":{
                "small": [],  // small = ( phone )
                "medium": [],   // medium = ( phablet )
                "large": [728,90],  // large = ( tablet )
                "xlarge": [728,90] // exlarge = ( laptop/desktop monitor )
            }
        }, {
            "tag": "dfp_logo",
            "sizes": [1, 2]
        }, {
            "tag": "dfp_photo_interstitial",
            "sizes": [1, 3]
        },{
            "tag": "dfp_photo_interstitial_takeover",
            "sizes": [1, 7]
        }, {
            "tag": "dfp_sponsorship_module",
            "sizes": [300, 150]
        }, {
            "tag": "dfp_smartphone_banner",
            "sizes": [320, 50]
        }, {
            "tag": "dfp_gallery_banner",
            "sizes": [320, 50],
            "mapping":{
                "small": [320,50],             // small = ( phone )
                "medium": [],             // medium = ( phablet )
                "large": [],  // large = ( tablet )
                "xlarge": []  // exlarge = ( laptop/desktop monitor )
            }
        }, {
            "tag": "dfp_smartphone_interstitial",
            "sizes": [[320,480],[480, 320]]
        }, {
            "tag": "dfp_pushdown_brandscape",
            "sizes": [[1, 5], [1, 14]]
        }, {
            "tag": "dfp_utility1",
            "sizes": [1, 6]
        }, {
            "tag": "dfp_utility2",
            "sizes": [1, 12]
        }, {
            "tag": "dfp_prog_bigbox",
            "sizes": [[300, 252],[300, 602],[300, 1052]],
            "mapping":{
                "small": [320,50],             // small = ( phone )
                "medium": [300,252],             // medium = ( phablet )
                "large": [[300,252],[300,602]],  // large = ( tablet )
                "xlarge": [[300,252],[300,602]]  // exlarge = ( laptop/desktop monitor )
            }
        }, {
            "tag": "dfp_rsi_module",
            "sizes": [1, 9]
        }, {
            "tag": "dfp_rsi_result",
            "sizes": [1, 10]
        }, {
            "tag": "dfp_cartridge",
            "sizes": [1, 11]
        }, {
            "tag": "dfp_grocery_list",
            "sizes": [1,13]
        }, {
            "tag": "dfp_native_ingredient",
            "sizes": [1,15]
        },{
           "tag": "dfp_native_recommendation",
           "sizes": [1,11]
       },{
          "tag": "dfp_native_infeed",
          "sizes": [1,11]
      },{
         "tag": "dfp_outstream",
         "sizes": [1,8]
      }
    ],

    /**
     * An array of ads that should be blocked on initial page load.
     * @type {Array}
     */
    blockInitialLoad: ["dfp_photo_interstitial", "dfp_photo_interstitial_1", "dfp_smartphone_interstitial", "dfp_leaderboard_1", "dfp_bigbox_1", "dfp_bigbox_2"],

    /**
     * DFP Premium is based on the notion of ad unit hierarchies. The idea is for the levels to
     * map against a sites content hierarchy. The DFP network ID is always first and acts as level_0.
     * We can have up to five levels. Set the page data key to use for each level here.
     *
     * Level1 will aways be required and the library will make every effort to determine it if the datra is not accesible
     * via mdManager or SniAds.init arguments.
     *
     * Any missing data beyond level 1 will be ignored and the resulting hierarchy will stop at level1.
     *
     * Extreme care should be taken when editing this. Changes have the potential to break ad functionality across the
     * entire DFP platform. So, please be careful.
     *
     * *Important*
     * Because there is not a consistent standard for meta-data key-values across the sites, a site may need to set this during
     * library initialization to map to the correct site hierarchy. Only the levels that need to change must be set. The rest
     * will use the global defaults.
     *
     * @example Setting custom hierarchy during init.
     * var config = {
     *     hierarchy_sections: {
     *         "level1" : "customSiteKey",
     *         "level2" : "customSectionKey"
     *     }
     * }
     * Levels 3, 4, and 5 will use the global defaults set in the file.
     *
     */

    // Default hierarchy - Can be overridden using overrides below based on site value.
    "hierarchy_sections" : {
      "level1": "site",
      "level2": "categorydspname",
      "level3": "sctndspname",
      "level4": null,
      "level5": null
    },

    "hierarchy_overrides": {
        "food": {
            "level1": "site",
            "level2": "section",
            "level3": null,
            "level4": null,
            "level5": null
        },
        "rr": {
          "level1": "site",
          "level2": "section",
          "level3": "vgncontent",
          "level4": null,
          "level5": null
        },
        "hgtv": {
          "level1": "site",
          "level2": "categorydspname",
          "level3": "sctndspname",
          "level4": "subsection",
          "level5": "subsection2"
        },
        "livingtv": {
            "level1": "site",
            "level2": "category",
            "level3": null,
            "level4": null,
            "level5": null
        }
    },

    /*=====================================================
    =            Photo Gallery Module Settings            =
    =====================================================*/

    "Gallery": {
       /**
        * Host server for descriptor file.
        * @type {string}
        */
      "photoDescriptorUrl": "http://code.adsales.snidigital.com/conf/ads-descriptors.js",

      /**
       * The message to show during an interstitial while the gallery is disabled. The empty span will contain the
       * delay timer and update every second.
       * @type {string}
       */
      "skipMessage": "Advertisement: You may skip ad in <span></span> seconds.",
      "interstitialSkipMessage": "Advertisement: You may skip ad in {{TIMELEFT}} seconds.",

      /**
       * Timer in seconds for interstitial element disable.
       */
      "interstitialTimer": 3,

      /**
       * Default descriptor file.
       * @type {string}
       */
      "photoDescriptorDefault": {
          active        : "true",
          interstitial  : "true",
          refreshRate   : "1",
          piSlot        : [10, 20, 30, 40, 50, 60],
          toSlot        : [60,70,80],
          adhesionRate  : "3"
      }
    },

    /*=============================================
    =            River Module Settings            =
    =============================================*/

   "River": {
        refreshRate: 2000, // Sets refresh rate for ad slots created with River.appendAutoSlot()
        refreshSlotName: "dfp_bigbox_auto", // Name to use for the refrehable ad slot.
        refreshTimeDelay: 10000 // Minimum time between ad refreshes (ignores refresh rate)
    },

    /*===========================================
    =            Responsive Settings            =
    ===========================================*/

    "Responsive": {
    },

    /*=====================================
    =            Sonobi Module            =
    =====================================*/
    "Sonobi": {
        /**
         * Sonobi placement mappings. The key is the dfp slot id and the value is the Sonobi placement id which is provided by Sonobi.
         * Added: Mon Nov 24 13:07:33 2014
         */
        "sonobi_placement_map": {
            "dfp_bigbox": "2e8e22dda03853264e63", // 300x250 Placement
            "dfp_smartphone_banner": "00ae1bb4f4a9542e8230", // 320x50 Placement
            "dfp_leaderboard": "dab9565c6af78c7301a7", // 728x90 Placement
            "dfp_leaderboard_body": "490c6af64bf29bb0e194", // 728x90 BTF Placement
            "dfp_prog_bigbox": "fd58b7cf72171295d5d4" // 300x250 BTF Placement
        },

        /**
         * Site specific Sonobi mappings. Old placement map must stay for now to ensure backward compat.
         */
        "placements": {
            "food": {
                "dfp_bigbox": "2e8e22dda03853264e63",
                "dfp_prog_bigbox": "fd58b7cf72171295d5d4",
                "dfp_smartphone_banner": "00ae1bb4f4a9542e8230",
                "dfp_leaderboard": "dab9565c6af78c7301a7",
                "dfp_leaderboard_body": "490c6af64bf29bb0e194"
            },
            "cook": {
                "dfp_bigbox": "30f7acd0b97f989d1a38",
                "dfp_prog_bigbox": "3fe30a35cb8aad7f64ed",
                "dfp_smartphone_banner": "a956c96cc2c1a4a78ec3",
                "dfp_leaderboard": "b3d21a8e7da6e5bcc679",
                "dfp_leaderboard_body": "bad949d69e34c4476380"
            },
            "diy": {
                "dfp_bigbox": "e95e62391a61191106fd",
                "dfp_prog_bigbox": "1119b4b96c6586046462",
                "dfp_smartphone_banner": "a08a9f8cdf9088d9333d",
                "dfp_leaderboard": "b2cef70b2e66fe80e6bb",
                "dfp_leaderboard_body": "43f27656ccf3106a6e67"
            },
            "foodcom": {
                "dfp_bigbox": "2419a52ae3d069aeb0fe",
                "dfp_prog_bigbox": "ce6a7f0b06d2bf92a361",
                "dfp_smartphone_banner": "3fb0f8aff1aa558f03c4",
                "dfp_leaderboard": "81342a2857d646ce811f",
                "dfp_leaderboard_body": "afa14c417a2588c858f5"
            },
            "door": {
                "dfp_bigbox": "f62b3048571fbbe0e256",
                "dfp_prog_bigbox": "b547291efe74273b4419",
                "dfp_smartphone_banner": "de53e2ecc27b4ebbc376",
                "dfp_leaderboard": "0b389fec7a3c850afffc",
                "dfp_leaderboard_body": "3916185da50d928ca181"
            },
            "gac": {
                "dfp_bigbox": "fc590eba8c409760d64d",
                "dfp_prog_bigbox": "cbc27bdbe9bc3900551b",
                "dfp_smartphone_banner": "d7d8713000ca0bd2c60c",
                "dfp_leaderboard": "579c4642ebd130129de1",
                "dfp_leaderboard_body": "003b2716af198e567512"
            },
            "hgtv": {
                "dfp_bigbox": "83aedfbdd86204dfb1cf",
                "dfp_prog_bigbox": "d3e0d20c2be5dd3ef73e",
                "dfp_smartphone_banner": "55d9cd90f17fee1bab14",
                "dfp_leaderboard": "14af6690d7ed7a31f20f",
                "dfp_leaderboard_body": "3dfd07b82f4c8611e810"
            },
            "grdn": {
                "dfp_bigbox": "46a6d85a6f2fcb680c6d",
                "dfp_prog_bigbox": "fb17a172932dfa4dea93",
                "dfp_smartphone_banner": "3f15e0009de851a7f6e8",
                "dfp_leaderboard": "b35c758a4be2afd60aef",
                "dfp_leaderboard_body": "91aba24ff43683468156"
            },
            "hgrm": {
                "dfp_bigbox": "881c9ea5eb4a587d14ba",
                "dfp_prog_bigbox": "6b680ec5c2ae4db4fa18",
                "dfp_smartphone_banner": "ddcf96c066dcfe515434",
                "dfp_leaderboard": "96a8df9739831d512d29",
                "dfp_leaderboard_body": "ec51892cf8609d1b6db2"
            },
            "travel": {
                "dfp_bigbox": "3d01d043a59c194eff93",
                "dfp_prog_bigbox": "aa40388f048cea828b20",
                "dfp_smartphone_banner": "61070b8e48710760f7cf",
                "dfp_leaderboard": "2661e2866ec1731713da",
                "dfp_leaderboard_body": "b71ef6fbac7f6e1af24c"
            }
        },

        /**
         * Maximum time to wait for Trinity request to resolve in milliseconds.
         */
        "trinity_timeout": 1000
    },
    "Amazon": {
        /**
         * Source id for publisher
         */
        "id": "3043",
        /**
         * Max wait time for Amazon request in milliseconds
         */
        "load_timeout": 500
    }


};
var dfpAdRestrictions = [];
var dfpSizeOverrides = [];

// Basic ad restriction file. All keys in a block must match for that block to pass and its action to apply. Note, the block order is important as a later block can operate on the same settings as an earlier one. General restriction blocks should come before specific ones.
//
// IMPORTANT: *** ALL KEYS AND VALUES MUST BE LOWER-CASED. ***

//IMPORTAN: *** ALWAYS USING SniAds.getKeyValues() IN CONSOLE FOR DETERMINE CORRECT VALES FOR ADDING NEW RESTRICTIONS

/*======================================
=            Size Overrides            =
======================================*/
/* Example block of Overide
dfpSizeOverrides.push({
   tag: "dfp_pushdown_brandscape",
   sizes: [[300,250]],
   keys: {
       "site": "food",
       "sponsorship": "size_override_testing"
   }
});
*/

// Restrict the 300x600 & 300x1050 slot size on the dfp_bigbox adslot on Food.com homepage
dfpSizeOverrides.push({
    tag: "dfp_bigbox",
    sizes: [[300, 250]],
    keys: {
        "site": "foodcom",
        "pagetype": "home"
    }
});

// Restrict the 300x600 & 300x1050 slot size on the dfp_bigbox adslot on Food Network homepage
dfpSizeOverrides.push({
    tag: "dfp_bigbox",
    sizes: [[300, 250]],
    keys: {
        "site": "food",
        "uniqueid": "food_homepage_c106c475_b1f9_4bd8_8d97_63c3f2ea8863_1"
    }
});

// Restrict the 300x600 & 300x1050 slot size on the dfp_bigbox adslot on Food Network Store
dfpSizeOverrides.push({
    tag: "dfp_bigbox",
    sizes: [[300, 250]],
    keys: {
        "site": "food",
        "category": "store"
    }
});

// Restrict the 300x600 & 300x1050 slot size on the dfp_bigbox adslot on Cooking Chanel homepage
dfpSizeOverrides.push({
    tag: "dfp_bigbox",
    sizes: [[300, 250]],
    keys: {
        "site": "cook",
        "uniqueid": "cook_cook_home_section_b9dbee4b_78b0_4bb0_b391_046b8436d4cc_1"
    }
});


// Restrict the 300x1050 slot size on the dfp_bigbox adslot on hgtv portal page
dfpSizeOverrides.push({
    tag: "dfp_bigbox",
    sizes: [[300, 250]],
    keys: {
        "site": "hgtv",
        "uniqueid": "hgtv_landingpage_b9823d3b_dd07_4c47_a5c4_8ee31dcc795d_1"
    }
});

// Restrict the 300x1050 and 300x600 size on the dfp_bigbox adslot on Frontdoor homepage
dfpSizeOverrides.push({
    tag: "dfp_bigbox",
    sizes: [[300, 250]],
    keys: {
        "site": "door",
        "uniqueid": "door_home_0000013c_aaf4_dd0c_a33d_aaf7b3ce0000_1"
    }
});

// Restrict the 300x250 & 300x1050 sizes on the dfp_bigbox adslot on photo library mainpage
dfpSizeOverrides.push({
    tag: "dfp_bigbox",
    sizes: [[300, 600]],
    keys: {
        "site": "hgtv",
        "category": "photos_main"
    }
});

// Restrict the 300x1050 sizes on the dfp_bigbox adslot on photo library page
dfpSizeOverrides.push({
    tag: "dfp_bigbox",
    sizes: [[300,250], [300, 600]],
    keys: {
        "site": "hgtv",
        "category": "pl_rooms_and_spaces"
    }
});

// Restrict the 300x250 sizes on the dfp_bigbox adslot on videoplaylistpage
dfpSizeOverrides.push({
    tag: "dfp_bigbox",
    sizes: [[300, 250]],
    keys: {
        "site": "hgtv",
        "pagetype": "videoplaylistpage"
    }
});


// Restrict the 300x250 sizes on the dfp_bigbox adslot on singlevideopage
dfpSizeOverrides.push({
    tag: "dfp_bigbox",
    sizes: [[300, 250]],
    keys: {
        "site": "hgtv",
        "pagetype": "singlevideopage"
    }
});

/*========================================================
=       First Entry Pushdown 1x14 SizeOverrides  Begin =
=========================================================*/

// Restrict the 1x14 slot size on the pushdown/brandsape adslot on Food.com homepage
dfpSizeOverrides.push({
    tag: "dfp_pushdown_brandscape",
    sizes: [[1, 5]],
    keys: {
        "site": "foodcom",
        "pagetype": "home"
    }
});

// Restrict the 1x14 slot size on the pushdown/brandsape adslot on Food Network homepage
dfpSizeOverrides.push({
    tag: "dfp_pushdown_brandscape",
    sizes: [[1, 5]],
    keys: {
        "site": "food",
        "uniqueid": "food_homepage_c106c475_b1f9_4bd8_8d97_63c3f2ea8863_1"
    }
});

// Restrict the 1x14 slot size on the pushdown/brandsape adslot on Cooking Chanel homepage
dfpSizeOverrides.push({
    tag: "dfp_pushdown_brandscape",
    sizes: [[1, 5]],
    keys: {
        "site": "cook",
        "uniqueid": "cook_cook_home_section_b9dbee4b_78b0_4bb0_b391_046b8436d4cc_1"
    }
});

// Start Generic Pagetype & Category  1x14 slot size restrictions across all sites
dfpSizeOverrides.push({
    tag: "dfp_pushdown_brandscape",
    sizes: [[1, 5]],
    keys: {
        "pagetype": "video"
    }
});

dfpSizeOverrides.push({
    tag: "dfp_pushdown_brandscape",
    sizes: [[1, 5]],
    keys: {
        "pagetype": "player"
    }
});

dfpSizeOverrides.push({
    tag: "dfp_pushdown_brandscape",
    sizes: [[1, 5]],
    keys: {
        "pagetype": "channel"
    }
});

dfpSizeOverrides.push({
    tag: "dfp_pushdown_brandscape",
    sizes: [[1, 5]],
    keys: {
        "pagetype": "photo_gallery"
    }
});

dfpSizeOverrides.push({
    tag: "dfp_pushdown_brandscape",
    sizes: [[1, 5]],
    keys: {
        "pagetype": "article"
    }
});

dfpSizeOverrides.push({
    tag: "dfp_pushdown_brandscape",
    sizes: [[1, 5]],
    keys: {
        "category": "search"
    }
});

dfpSizeOverrides.push({
    tag: "dfp_pushdown_brandscape",
    sizes: [[1, 5]],
    keys: {
        "vgncontent": "search"
    }
});

dfpSizeOverrides.push({
    tag: "dfp_pushdown_brandscape",
    sizes: [[1, 5]],
    keys: {
        "category": "video"
    }
});

dfpSizeOverrides.push({
    tag: "dfp_pushdown_brandscape",
    sizes: [[1, 5]],
    keys: {
        "category": "home"
    }
});

dfpSizeOverrides.push({
    tag: "dfp_pushdown_brandscape",
    sizes: [[1, 5]],
    keys: {
        "category": "blog"
    }
});

dfpSizeOverrides.push({
    tag: "dfp_pushdown_brandscape",
    sizes: [[1, 5]],
    keys: {
        "category": "home"
    }
});

dfpSizeOverrides.push({
    tag: "dfp_pushdown_brandscape",
    sizes: [[1, 5]],
    keys: {
        "category": "store"
    }
});

dfpSizeOverrides.push({
    tag: "dfp_pushdown_brandscape",
    sizes: [[1, 5]],
    keys: {
        "category": "marketplace"
    }
});

dfpSizeOverrides.push({
    tag: "dfp_pushdown_brandscape",
    sizes: [[1, 5]],
    keys: {
        "category": "about_us"
    }
});

dfpSizeOverrides.push({
    tag: "dfp_pushdown_brandscape",
    sizes: [[1, 5]],
    keys: {
        "category": "doory_awards"
    }
});

dfpSizeOverrides.push({
    tag: "dfp_pushdown_brandscape",
    sizes: [[1, 5]],
    keys: {
        "category": "healthy_eating"
    }
});

dfpSizeOverrides.push({
    tag: "dfp_pushdown_brandscape",
    sizes: [[1, 5]],
    keys: {
        "vgncontent": "myrecipebox"
    }
});

dfpSizeOverrides.push({
    tag: "dfp_pushdown_brandscape",
    sizes: [[1, 5]],
    keys: {
        "pagetype": "video_player"
    }
});

dfpSizeOverrides.push({
    tag: "dfp_pushdown_brandscape",
    sizes: [[1, 5]],
    keys: {
        "pagetype": "landingpage"
    }
});

// End Generic Pagetype & Category  1x14 slot size restrictions across all sites

/*=====================================================
=       First Entry Pushdown 1x14 SizeOverrides  End =
=======================================================*/


/*=================================
=       Additional Size Overrides =
===================================*/

// Restrict the 300x50 size from the dfp_leaderboard_body slot. Only 728x90 valid. Breakpoint mapping will make this apply to mobile only.
// Added: Fri Nov  7 15:03:47 2014 - AH
// Disabled: Sat Nov  8 20:16:47 2014 (Kinda tricky so leaving here commented if we need to do again at some point.)
// dfpSizeOverrides.push({
//     tag: "dfp_leaderboard_body",
//     sizes: [[728,90]],
//     keys: {
//         "site": "hgtv",
//         "pagetype": "photolibrarycollectionpage",
//         "category": "photos_search"
//     }
// });

/*=====================================
=       Additional Size Overrides END =
=====================================*/


/*======================================
=           Restrictions           =
======================================*/

/*  Example Block of Enable vs Restrict
// Restrict the dfp_bigbox slot on all foodnetwork pages (site=food)
dfpAdRestrictions.push({
    tag: "dfp_bigbox",
    action: "restrict",
    keys: {
        "site": "food"
    }
});

// Enable bigbox on pages with site = food. Just to test the restrict/enable
dfpAdRestrictions.push({
    tag: "dfp_bigbox",
    action: "enable",
    keys: {
        "site": "food"
    }
});
*/

// Restrict the dfp_leaderboard slot on foodnetwork homepage
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "restrict",
    keys: {
        "site": "food",
        "uniqueid": "food_homepage_c106c475_b1f9_4bd8_8d97_63c3f2ea8863_1"
    }
});


// Restrict the dfp_cartridge slot on foodnetwork search page
dfpAdRestrictions.push({
    tag: "dfp_cartridge",
    action: "restrict",
    keys: {
        "site": "food",
        "category": "search"
    }
});

// Restrict the dfp_cartridge slot on foodnetwork photo gallery pages
dfpAdRestrictions.push({
    tag: "dfp_cartridge",
    action: "restrict",
    keys: {
        "site": "food",
        "pagetype": "photo_gallery"
    }
});

// Restrict the dfp_cartridge slot on foodnetwork http://www.foodnetwork.com/sponsored/sweepstakes/cantry-cook-off/rules.html
dfpAdRestrictions.push({
    tag: "dfp_cartridge",
    action: "restrict",
    keys: {
        "uniqueid": "food_universal_landing_7bd1b35c_afe3_4a72_8c51_e8cbaab346c7_1"
    }
});

// Restrict the dfp_pushdown_brandscape slot on foodnetwork http://www.foodnetwork.com/sponsored/sweepstakes/cantry-cook-off/rules.html
dfpAdRestrictions.push({
    tag: "dfp_pushdown_brandscape",
    action: "restrict",
    keys: {
        "uniqueid": "food_universal_landing_7bd1b35c_afe3_4a72_8c51_e8cbaab346c7_1"
    }
});



// Restrict the dfp_prog_bigbox slot on foodnetwork universal-landing pages
dfpAdRestrictions.push({
    tag: "dfp_prog_bigbox",
    action: "restrict",
    keys: {
        "pagetype": "universal_landing"
    }
});

// Restrict the dfp_utility1 slot on foodnetwork homepage
dfpAdRestrictions.push({
    tag: "dfp_utility1",
    action: "restrict",
    keys: {
        "site": "food",
        "uniqueid": "food_homepage_c106c475_b1f9_4bd8_8d97_63c3f2ea8863_1"
    }
});

// Restrict the dfp_utility2 slot on foodnetwork homepage
dfpAdRestrictions.push({
    tag: "dfp_utility2",
    action: "restrict",
    keys: {
        "site": "food",
        "uniqueid": "food_homepage_c106c475_b1f9_4bd8_8d97_63c3f2ea8863_1"
    }
});

// Restrict the dfp_leaderboard slot univeral-landing pages
// Enabled 4/06/15 per Cara May -JT
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "enable",
    keys: {
        "site": "food",
        "pagetype": "universal_landing"
    }
});

// Restrict the dfp_leaderboard slot video_player pages
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "restrict",
    keys: {
        "site": "food",
        "pagetype": "video_player"
    }
});

// Restrict the dfp_leaderboard slot video_channel pages
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "restrict",
    keys: {
        "site": "food",
        "pagetype": "video_channel"
    }
});


// Restrict the dfp_leaderboard slot on foodnetwork search page
// Leaderboard enabled on 11/12 per G. Volrath - JT
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "enable",
    keys: {
        "site": "food",
        "pagetype": "search"
    }
});

// Restrict the dfp_leaderboard slot on foodnetwork video page
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "restrict",
    keys: {
        "site": "food",
        "pagetype": "video"
    }
});

// Restrict the dfp_leaderboard slot on food.com recipe_search page
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "restrict",
    keys: {
        "site": "foodcom",
        "pagetype": "recipe_search"
    }
});

// Restrict the dfp_leaderboard slot on food.com food_holiday 3rd level
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "restrict",
    keys: {
        "site": "foodcom",
        "vgncontent": "food_holidays"
    }
});

// Restrict the dfp_leaderboard slot on Cooking Channel chef section front
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "restrict",
    keys: {
        "site": "cook",
        "pagetype": "chefs_and_hosts_section"
    }
});

// Restrict the dfp_leaderboard slot on Cooking Channel show section front
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "restrict",
    keys: {
        "site": "cook",
        "pagetype": "show_section"
    }
});

// Restrict the dfp_leaderboard slot on Cooking Channel recipe section front
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "restrict",
    keys: {
        "site": "cook",
        "pagetype": "recipe_section"
    }
});

// Restrict the dfp_leaderboard slot on Cooking Channel homepage
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "restrict",
    keys: {
        "site": "cook",
        "pagetype": "cook_home_section"
    }
});

// Restrict the dfp_leaderboard slot on Cooking Channel search page
// Enabled 5/28/15 per Brad Flowers and Cara May - JT
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "enable",
    keys: {
        "site": "cook",
        "pagetype": "search"
    }
});

// Restrict 300x150 on main Foodnetwork.com page.
dfpAdRestrictions.push({
    tag: "dfp_sponsorship_module",
    action: "restrict",
    keys: {
        "site": "food",
        "pagetype": "homepage"
    }
});

/*
// Restrict 300x150 on section fronts Food Network.com.
dfpAdRestrictions.push({
    tag: "dfp_sponsorship_module",
    action: "restrict",
    keys: {
        "site": "food",
        "pagetype": "universal_landing"
    }
});
*/

// Restrict dfp_mobile_banner on FOOD store pages in case the slot is not removed. One they remove it, we can take this out. - Andy 9/30/2014
dfpAdRestrictions.push({
    tag: "dfp_mobile_banner",
    action: "restrict",
    keys: {
        "site": "food",
        "category": "store"
    }
});

// Restrict the dfp_prog_bigbox slot of Food.com homepage
dfpAdRestrictions.push({
    tag: "dfp_prog_bigbox",
    action: "restrict",
    keys: {
        "site": "foodcom",
        "pagetype": "home"
    }
});

// Restrict the dfp_prog_bigbox slot of Food.com tailgating package
dfpAdRestrictions.push({
    tag: "dfp_prog_bigbox",
    action: "restrict",
    keys: {
        "site": "foodcom",
        "topic": "fc_tailgating"
    }
});


//************************************************************************//
//                  -- Begin Home Ad Restrictions --                        //
//***********************************************************************//

// Restrict the dfp_leaderboard slot on photo library advertiser profile pages
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "pagetype": "photolibrarylandingpage"
    }
});

// Restrict the dfp_pushdown_brandscape slot on photo library landing page
dfpAdRestrictions.push({
    tag: "dfp_pushdown_brandscape",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "pagetype": "photolibrarylandingpage"
    }
});

// Restrict the dfp_cartridge slot on photo library landing page
dfpAdRestrictions.push({
    tag: "dfp_cartridge",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "pagetype": "photolibrarylandingpage"
    }
});

// Restrict the dfp_pushdown_brandscape slot on photo library viewer page
dfpAdRestrictions.push({
    tag: "dfp_pushdown_brandscape",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "pagetype": "photolibraryviewerpage"
    }
});

// Restrict the dfp_prog_bigbox slot on photo library category page - per Cara May 4/23/15
dfpAdRestrictions.push({
    tag: "dfp_prog_bigbox",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "pagetype": "photolibrarycategorypage"
    }
});

// Restrict the dfp_smartphone_banner slot on photo library advertiser profile pages
dfpAdRestrictions.push({
    tag: "dfp_smartphone_banner",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "pagetype": "advertiserprofilepage"
    }
});

// Restrict the dfp_leaderboard slot on photo library advertiser profile pages
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "pagetype": "advertiserprofilepage"
    }
});

// Restrict the dfp_bigbox slot on photo library advertiser profile pages
dfpAdRestrictions.push({
    tag: "dfp_bigbox",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "pagetype": "advertiserprofilepage"
    }
});

// Restrict the dfp_pushdown_brandscape slot on photo library advertiser profile pages
dfpAdRestrictions.push({
    tag: "dfp_pushdown_brandscape",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "pagetype": "advertiserprofilepage"
    }
});

// Restrict the dfp_logo slot on photo library advertiser profile pages
dfpAdRestrictions.push({
    tag: "dfp_logo",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "pagetype": "advertiserprofilepage"
    }
});

// Restrict the dfp_logo slot on http://www.hgtv.com/about-us/hgtv-sweepstakes/25-grand-in-your-hand/flip-or-flop
dfpAdRestrictions.push({
    tag: "dfp_logo",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "subsection": "25-grand-in-your-hand"
    }
});

// Restrict the dfp_sponsorship_module slot on photo library advertiser profile pages
dfpAdRestrictions.push({
    tag: "dfp_sponsorship_module",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "pagetype": "advertiserprofilepage"
    }
});


// Restrict the dfp_prog_bigbox slot on photo library advertiser profile pages
dfpAdRestrictions.push({
    tag: "dfp_prog_bigbox",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "pagetype": "advertiserprofilepage"
    }
});


// Restrict the dfp_smartphone_banner slot on photo library professional profile pages
dfpAdRestrictions.push({
    tag: "dfp_smartphone_banner",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "pagetype": "professionalprofilepage"
    }
});

// Restrict the dfp_leaderboard slot on photo library professional profile pages
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "pagetype": "professionalprofilepage"
    }
});

// Restrict the dfp_bigbox slot on photo library professional profile pages
dfpAdRestrictions.push({
    tag: "dfp_bigbox",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "pagetype": "professionalprofilepage"
    }
});

// Restrict the dfp_pushdown_brandscape slot on photo library professional profile pages
dfpAdRestrictions.push({
    tag: "dfp_pushdown_brandscape",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "pagetype": "professionalprofilepage"
    }
});

// Restrict the dfp_logo slot on photo library professional profile pages
dfpAdRestrictions.push({
    tag: "dfp_logo",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "pagetype": "professionalprofilepage"
    }
});

// Restrict the dfp_sponsorship_module slot on photo library professional profile pages
dfpAdRestrictions.push({
    tag: "dfp_sponsorship_module",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "pagetype": "professionalprofilepage"
    }
});


// Restrict the dfp_prog_bigbox slot on photo library professional profile pages
dfpAdRestrictions.push({
    tag: "dfp_prog_bigbox",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "pagetype": "professionalprofilepage"
    }
});

// Restrict the dfp_smartphone_banner slot on photo library designer profile pages
dfpAdRestrictions.push({
    tag: "dfp_smartphone_banner",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "pagetype": "designerprofilepage"
    }
});

// Restrict the dfp_smartphone_banner slot on photo library viewer pages
dfpAdRestrictions.push({
    tag: "dfp_smartphone_banner",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "pagetype": "photolibraryviewerpage"
    }
});

// Restrict the dfp_leaderboard slot on photo library designer profile pages
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "pagetype": "designerprofilepage"
    }
});

// Restrict the dfp_bigbox slot on photo library designer profile pages
dfpAdRestrictions.push({
    tag: "dfp_bigbox",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "pagetype": "designerprofilepage"
    }
});

// Restrict the dfp_pushdown_brandscape slot on photo library designer profile pages
dfpAdRestrictions.push({
    tag: "dfp_pushdown_brandscape",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "pagetype": "designerprofilepage"
    }
});

// Restrict the dfp_logo slot on photo library designer profile pages
dfpAdRestrictions.push({
    tag: "dfp_logo",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "pagetype": "designerprofilepage"
    }
});

// Restrict the dfp_sponsorship_module slot on photo library designer profile pages
dfpAdRestrictions.push({
    tag: "dfp_sponsorship_module",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "pagetype": "designerprofilepage"
    }
});


// Restrict the dfp_prog_bigbox slot on photo library designer profile pages
dfpAdRestrictions.push({
    tag: "dfp_prog_bigbox",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "pagetype": "designerprofilepage"
    }
});


// end designer page restrictionss



// begin partner profile page restrictions.

// Restrict the dfp_smartphone_banner slot on photo library partner profile pages
dfpAdRestrictions.push({
    tag: "dfp_smartphone_banner",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "pagetype": "partnerprofilepage"
    }
});

// Restrict the dfp_leaderboard slot on photo library partner profile pages
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "pagetype": "partnerprofilepage"
    }
});

// Restrict the dfp_bigbox slot on photo library partner profile pages
dfpAdRestrictions.push({
    tag: "dfp_bigbox",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "pagetype": "partnerprofilepage"
    }
});

// Restrict the dfp_pushdown_brandscape slot on photo library partner profile pages
dfpAdRestrictions.push({
    tag: "dfp_pushdown_brandscape",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "pagetype": "partnerprofilepage"
    }
});

// Restrict the dfp_logo slot on photo library partner profile pages
dfpAdRestrictions.push({
    tag: "dfp_logo",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "pagetype": "partnerprofilepage"
    }
});

// Restrict the dfp_sponsorship_module slot on photo library partner profile pages
dfpAdRestrictions.push({
    tag: "dfp_sponsorship_module",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "pagetype": "partnerprofilepage"
    }
});


// Restrict the dfp_prog_bigbox slot on photo library partner profile pages
dfpAdRestrictions.push({
    tag: "dfp_prog_bigbox",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "pagetype": "partnerprofilepage"
    }
});


// end partner profile page



// Restrict the dfp_logo slot on hgtv pagetype landingpage pages
dfpAdRestrictions.push({
    tag: "dfp_logo",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "pagetype": "landingpage"
    }
});


/*
// Restrict the dfp_leaderboard slot on hgtv pagetype singlevideopage pages
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "pagetype": "singlevideopage"
    }
});
*/

/*
// Restrict the dfp_leaderboard slot on hgtv pagetype videoplaylistpage pages
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "pagetype": "videoplaylistpage"
    }
});
*/

// Restrict the dfp_pushdown_brandscape slot on hgtv pagetype singlevideopagee pages
dfpAdRestrictions.push({
    tag: "dfp_pushdown_brandscape",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "pagetype": "singlevideopage"
    }
});

// Restrict the dfp_pushdown_brandscape slot on hgtv pagetype videoplaylistpage pages
dfpAdRestrictions.push({
    tag: "dfp_pushdown_brandscape",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "pagetype": "videoplaylistpage"
    }
});

// Restrict the dfp_pushdown_brandscape slot on hgtv pagetype photogallerypage pages
dfpAdRestrictions.push({
    tag: "dfp_pushdown_brandscape",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "pagetype": "photogallerypage"
    }
});


/*
// Restrict the dfp_leaderboard on the top of the navigation slot on hgtv pagetype photolibrarysearchpage pages
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "pagetype": "photolibrarysearchpage"
    }
});
*/

// Restrict the dfp_leaderboard on the top of the navigation slot on hgtv pagetype photolibrarycollectionpage pages
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "pagetype": "photolibrarycollectionpage"
    }
});

// Restrict the dfp_smartphone_banner on the top of the navigation slot on hgtv pagetype photolibrarycollectionpage pages
dfpAdRestrictions.push({
    tag: "dfp_smartphone_banner",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "pagetype": "photolibrarycollectionpage"
    }
});


// Restrict the dfp_leaderboard  on hgtv portal page
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "uniqueid": "hgtv_landingpage_466c141156dd2b88eeffedd780cf9126_1"
    }
});

// Restrict the dfp_bigbox  on hgtv singlevideopage page
dfpAdRestrictions.push({
    tag: "dfp_bigbox",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "pagetype": "singlevideopage"
    }
});

// Restrict the dfp_prog_bigbox slot on hgtv portal page
dfpAdRestrictions.push({
    tag: "dfp_prog_bigbox",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "uniqueid": "hgtv_landingpage_466c141156dd2b88eeffedd780cf9126_1"
    }
});

/*
// Restrict the dfp_leaderboard  on hgtv remodels main page
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "uniqueid": "hgtv_landingpage_c9d84da7d0081817bacdb696ed6aa25f_1"
    }
});
*/


// Restrict the dfp_photo_interstitial  on hgtv category sponsors pages
dfpAdRestrictions.push({
    tag: "dfp_photo_interstitial",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "category": "sponsors"
    }
});

// Restrict the dfp_sponsorship_module  on hgtv sponsor pages
dfpAdRestrictions.push({
    tag: "dfp_sponsorship_module",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "category": "sponsors"
    }
});


// Restrict the dfp_prog_bigbox on hgtv sponsor pages
dfpAdRestrictions.push({
    tag: "dfp_prog_bigbox",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "category": "sponsors"
    }
});


// Restrict the dfp_prog_bigbox on hgtv handmade holidays package
dfpAdRestrictions.push({
    tag: "dfp_prog_bigbox",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "topic": "handmadeholidays"
    }
});

// Restrict the dfp_prog_bigbox on hgtv party planning package
dfpAdRestrictions.push({
    tag: "dfp_prog_bigbox",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "topic": "partyplanning101"
    }
});

// Restrict the dfp_native_recommendation on uniqueId: hgtv_articlepage_356aaad33fcb4f17eb9ce0abfd018995_1
dfpAdRestrictions.push({
    tag: "dfp_native_recommendation",
    action: "restrict",
    keys: {
        "site": "hgtv",
        "uniqueid": "hgtv_articlepage_356aaad33fcb4f17eb9ce0abfd018995_1"
    }
});

/*================================================
=            DIY Network Restrictions            =
================================================*/

// Restrict leaderboard on DIY homepages
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "restrict",
    keys: {
        "site": "diy",
        "uniqueid": "diy_landingpage_e8a03bb91937cfc0387317393cdbb9b4_1"
    }
});

// Restrict programmatic big box on DIY homepages
dfpAdRestrictions.push({
    tag: "dfp_prog_bigbox",
    action: "restrict",
    keys: {
        "site": "diy",
        "uniqueid": "diy_landingpage_e8a03bb91937cfc0387317393cdbb9b4_1"
    }
});

/*=========================================
=            TravelChannel.com            =
=========================================*/

 // Restrict leaderboard on homepage.
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "restrict",
    keys: {
        "site": "travel",
        "uniqueid":"travel_home_5a9ace5fa4e6b461135b10afdf0bda70_1"
    }
});

 // Restrict prog bigbox on homepage.
dfpAdRestrictions.push({
    tag: "dfp_prog_bigbox",
    action: "restrict",
    keys: {
        "site": "travel",
        "uniqueid":"travel_home_5a9ace5fa4e6b461135b10afdf0bda70_1"
    }
});

// Restrict dfp_logo on Travel sweeps landing page
dfpAdRestrictions.push({
    tag: "dfp_logo",
    action: "restrict",
    keys: {
        "site": "travel",
        "sctndspname":"landing",
        "type": "sweepstakes_main"
    }
});

 // Restrict bigbox auto on homepage.
dfpAdRestrictions.push({
    tag: "dfp_bigbox_auto",
    action: "restrict",
    keys: {
        "site": "travel",
        "uniqueid":"travel_home_5a9ace5fa4e6b461135b10afdf0bda70_1"
    }
});

// Enable for cs_debug
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "enable",
    keys: {
        "site": "travel",
        "uniqueid":"travel_home_5a9ace5fa4e6b461135b10afdf0bda70_1",
        "delivery_channel": "mobile"
    }
});

// Restrict dfp_leaderboard on landing pages.
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "restrict",
    keys: {
        "site": "travel",
        "pagetype": "landing"
    }
});

// Restrict dfp_cartridge on web series pages.
dfpAdRestrictions.push({
    tag: "dfp_cartridge",
    action: "restrict",
    keys: {
        "site": "travel",
        "pagetype": "web_series"
    }
});


// Restrict dfp_logo on mobile.
dfpAdRestrictions.push({
    tag: "dfp_logo",
    action: "restrict",
    keys: {
        "site": "travel",
        "delivery_channel": "mobile"
    }
});

 // Restrict prog bigbox on sweepstakes.
dfpAdRestrictions.push({
    tag: "dfp_prog_bigbox",
    action: "restrict",
    keys: {
        "site": "travel",
        "category": "sweepstakes"
    }
});


/**
 * Size Overrides
 */

// Restrict the 300x600 & 300x1050 slot size on the dfp_bigbox adslot on Travel homepage
dfpSizeOverrides.push({
    tag: "dfp_bigbox",
    sizes: [[300, 250]],
    keys: {
        "site": "travel",
        "uniqueid": "travel_landing_8ad49661f82ae063c4425419a01f5c8a_1"
    }
});

dfpSizeOverrides.push({
    tag: "dfp_bigbox",
    sizes: [[300, 250],[300,600]],
    keys: {
        "site": "travel",
        "pagetype": "photo_gallery"
    }
});

// Restrict to 300x250 only on Travel mobile.
dfpSizeOverrides.push({
    tag: "dfp_bigbox",
    sizes: [[300, 250]],
    keys: {
        "site": "travel",
        "delivery_channel": "mobile"
    }
});
dfpSizeOverrides.push({
    tag: "dfp_bigbox_auto",
    sizes: [[300, 250]],
    keys: {
        "site": "travel",
        "delivery_channel": "mobile"
    }
});

/**
* GAC Restrictions
**/

// 300x250 only on home page
dfpSizeOverrides.push({
    tag: "dfp_bigbox",
    sizes: [[300,250]],
    keys: {
        "site": "gac",
        "uniqueid": "gac_landingpage_fa5a26ed246fca9bdcd0dfe8701407d9_1"
    }
});

// Restrict the leaderboard on home page.
dfpAdRestrictions.push({
    tag: "dfp_leaderboard",
    action: "restrict",
    keys: {
        "site": "gac",
        "uniqueid": "gac_landingpage_fa5a26ed246fca9bdcd0dfe8701407d9_1"
    }
});

