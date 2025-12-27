const nagalandData = [
    // 1. KOHIMA (7 Blocks)
    { state: "Nagaland", district: "Kohima", block: "Kohima" },
    { state: "Nagaland", district: "Kohima", block: "Jakhama" },
    { state: "Nagaland", district: "Kohima", block: "Chiephobozou" },
    { state: "Nagaland", district: "Kohima", block: "Sechu-Zubza" },
    { state: "Nagaland", district: "Kohima", block: "Botsa" },
    { state: "Nagaland", district: "Kohima", block: "Kezocha" },
    { state: "Nagaland", district: "Kohima", block: "Tseminyu" }, // नोट: अब यह स्वयं एक जिला भी है

    // 2. DIMAPUR (4 Blocks)
    { state: "Nagaland", district: "Dimapur", block: "Dimapur" },
    { state: "Nagaland", district: "Dimapur", block: "Medziphema" },
    { state: "Nagaland", district: "Dimapur", block: "Dhansiripar" },
    { state: "Nagaland", district: "Dimapur", block: "Chumukedima" }, // नोट: अब यह स्वयं एक जिला भी है

    // 3. MOKOKCHUNG (9 Blocks)
    { state: "Nagaland", district: "Mokokchung", block: "Ongpangkong North" },
    { state: "Nagaland", district: "Mokokchung", block: "Ongpangkong South" },
    { state: "Nagaland", district: "Mokokchung", block: "Mangkolemba" },
    { state: "Nagaland", district: "Mokokchung", block: "Changtongya" },
    { state: "Nagaland", district: "Mokokchung", block: "Tuli" },
    { state: "Nagaland", district: "Mokokchung", block: "Alongkaki" },
    { state: "Nagaland", district: "Mokokchung", block: "Longchem" },
    { state: "Nagaland", district: "Mokokchung", block: "Kobulong" },
    { state: "Nagaland", district: "Mokokchung", block: "Chuchuyimlang" },

    // 4. MON (8 Blocks)
    { state: "Nagaland", district: "Mon", block: "Mon" },
    { state: "Nagaland", district: "Mon", block: "Tizit" },
    { state: "Nagaland", district: "Mon", block: "Naganimora" },
    { state: "Nagaland", district: "Mon", block: "Chen" },
    { state: "Nagaland", district: "Mon", block: "Angjangyang" },
    { state: "Nagaland", district: "Mon", block: "Phomching" },
    { state: "Nagaland", district: "Mon", block: "Tobu" },
    { state: "Nagaland", district: "Mon", block: "Wakching" },

    // 5. PHEK (8 Blocks)
    { state: "Nagaland", district: "Phek", block: "Phek" },
    { state: "Nagaland", district: "Phek", block: "Pfutsero" },
    { state: "Nagaland", district: "Phek", block: "Chozuba" },
    { state: "Nagaland", district: "Phek", block: "Meluri" },
    { state: "Nagaland", district: "Phek", block: "Kikruma" },
    { state: "Nagaland", district: "Phek", block: "Chetheba" },
    { state: "Nagaland", district: "Phek", block: "Sekruzu" },
    { state: "Nagaland", district: "Phek", block: "Razeba" },

    // 6. TUENSANG (7 Blocks)
    { state: "Nagaland", district: "Tuensang", block: "Tuensang" },
    { state: "Nagaland", district: "Tuensang", block: "Noksen" },
    { state: "Nagaland", district: "Tuensang", block: "Chare" },
    { state: "Nagaland", district: "Tuensang", block: "Longkhim" },
    { state: "Nagaland", district: "Tuensang", block: "Sangsangnyu" },
    { state: "Nagaland", district: "Tuensang", block: "Thonoknyu" },
    { state: "Nagaland", district: "Tuensang", block: "Chessore" },

    // 7. WOKHA (7 Blocks)
    { state: "Nagaland", district: "Wokha", block: "Wokha" },
    { state: "Nagaland", district: "Wokha", block: "Bhandari" },
    { state: "Nagaland", district: "Wokha", block: "Sanis" },
    { state: "Nagaland", district: "Wokha", block: "Chukitong" },
    { state: "Nagaland", district: "Wokha", block: "Ralan" },
    { state: "Nagaland", district: "Wokha", block: "Wozhuro" },
    { state: "Nagaland", district: "Wokha", block: "Englan" },

    // 8. ZUNHEBOTO (8 Blocks)
    { state: "Nagaland", district: "Zunheboto", block: "Zunheboto" },
    { state: "Nagaland", district: "Zunheboto", block: "Akuluto" },
    { state: "Nagaland", district: "Zunheboto", block: "Suruhuto" },
    { state: "Nagaland", district: "Zunheboto", block: "Aghunato" },
    { state: "Nagaland", district: "Zunheboto", block: "Satakha" },
    { state: "Nagaland", district: "Zunheboto", block: "Pughoboto" },
    { state: "Nagaland", district: "Zunheboto", block: "Ghapani" },
    { state: "Nagaland", district: "Zunheboto", block: "Tokiye" },

    // 9. KIPHIRE (5 Blocks)
    { state: "Nagaland", district: "Kiphire", block: "Kiphire" },
    { state: "Nagaland", district: "Kiphire", block: "Pungro" },
    { state: "Nagaland", district: "Kiphire", block: "Sitimi" },
    { state: "Nagaland", district: "Kiphire", block: "Khushitoth" },
    { state: "Nagaland", district: "Kiphire", block: "Longmatra" },

    // 10. LONGLENG (3 Blocks)
    { state: "Nagaland", district: "Longleng", block: "Longleng" },
    { state: "Nagaland", district: "Longleng", block: "Tamlu" },
    { state: "Nagaland", district: "Longleng", block: "Sakshi" },

    // 11. PEREN (4 Blocks)
    { state: "Nagaland", district: "Peren", block: "Peren" },
    { state: "Nagaland", district: "Peren", block: "Jalukie" },
    { state: "Nagaland", district: "Peren", block: "Tening" },
    { state: "Nagaland", district: "Peren", block: "Ahthibung" },

    // 12. NOKLAK (2 Blocks)
    { state: "Nagaland", district: "Noklak", block: "Noklak" },
    { state: "Nagaland", district: "Noklak", block: "Pangsha" },

    // 13. CHUMUKEDIMA (3 Blocks)
    { state: "Nagaland", district: "Chumukedima", block: "Chumukedima" },
    { state: "Nagaland", district: "Chumukedima", block: "Medziphema" },
    { state: "Nagaland", district: "Chumukedima", block: "Dhansiripar" },

    // 14. NIULAND (2 Blocks)
    { state: "Nagaland", district: "Niuland", block: "Niuland" },
    { state: "Nagaland", district: "Niuland", block: "Kuhuboto" },

    // 15. TSEMINYU (1 Block)
    { state: "Nagaland", district: "Tseminyu", block: "Tseminyu" },

    // 16. SHAMATOR (2 Blocks)
    { state: "Nagaland", district: "Shamator", block: "Shamator" },
    { state: "Nagaland", district: "Shamator", block: "Chessore" }
];

module.exports = nagalandData;