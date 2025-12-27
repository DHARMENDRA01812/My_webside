const uttarakhandData = [
    // 1. ALMORA (11 Blocks)
    { state: "Uttarakhand", district: "Almora", block: "Bhikiyasain" },
    { state: "Uttarakhand", district: "Almora", block: "Chaukhutiya" },
    { state: "Uttarakhand", district: "Almora", block: "Dhauladevi" },
    { state: "Uttarakhand", district: "Almora", block: "Dwarahat" },
    { state: "Uttarakhand", district: "Almora", block: "Hawalbagh" },
    { state: "Uttarakhand", district: "Almora", block: "Lamgara" },
    { state: "Uttarakhand", district: "Almora", block: "Salt" },
    { state: "Uttarakhand", district: "Almora", block: "Syaldey" },
    { state: "Uttarakhand", district: "Almora", block: "Takula" },
    { state: "Uttarakhand", district: "Almora", block: "Tarikhet" },
    { state: "Uttarakhand", district: "Almora", block: "Bhaisiya Chhana" },

    // 2. BAGESHWAR (3 Blocks)
    { state: "Uttarakhand", district: "Bageshwar", block: "Bageshwar" },
    { state: "Uttarakhand", district: "Bageshwar", block: "Garur" },
    { state: "Uttarakhand", district: "Bageshwar", block: "Kapkot" },

    // 3. CHAMOLI (9 Blocks)
    { state: "Uttarakhand", district: "Chamoli", block: "Dasholi" },
    { state: "Uttarakhand", district: "Chamoli", block: "Dewal" },
    { state: "Uttarakhand", district: "Chamoli", block: "Gairsain" },
    { state: "Uttarakhand", district: "Chamoli", block: "Ghat" },
    { state: "Uttarakhand", district: "Chamoli", block: "Joshimath" },
    { state: "Uttarakhand", district: "Chamoli", block: "Karnaprayag" },
    { state: "Uttarakhand", district: "Chamoli", block: "Narayanbagar" },
    { state: "Uttarakhand", district: "Chamoli", block: "Pokhari" },
    { state: "Uttarakhand", district: "Chamoli", block: "Tharali" },

    // 4. CHAMPAWAT (4 Blocks)
    { state: "Uttarakhand", district: "Champawat", block: "Champawat" },
    { state: "Uttarakhand", district: "Champawat", block: "Lohaghat" },
    { state: "Uttarakhand", district: "Champawat", block: "Barakot" },
    { state: "Uttarakhand", district: "Champawat", block: "Pati" },

    // 5. DEHRADUN (6 Blocks)
    { state: "Uttarakhand", district: "Dehradun", block: "Chakrata" },
    { state: "Uttarakhand", district: "Dehradun", block: "Doiwala" },
    { state: "Uttarakhand", district: "Dehradun", block: "Kalsi" },
    { state: "Uttarakhand", district: "Dehradun", block: "Raipur" },
    { state: "Uttarakhand", district: "Dehradun", block: "Sahaspur" },
    { state: "Uttarakhand", district: "Dehradun", block: "Vikasnagar" },

    // 6. HARIDWAR (6 Blocks)
    { state: "Uttarakhand", district: "Haridwar", block: "Bahadarabad" },
    { state: "Uttarakhand", district: "Haridwar", block: "Bhagwanpur" },
    { state: "Uttarakhand", district: "Haridwar", block: "Laksar" },
    { state: "Uttarakhand", district: "Haridwar", block: "Narsan" },
    { state: "Uttarakhand", district: "Haridwar", block: "Roorkee" },
    { state: "Uttarakhand", district: "Haridwar", block: "Khanpur" },

    // 7. NAINITAL (8 Blocks)
    { state: "Uttarakhand", district: "Nainital", block: "Betalghat" },
    { state: "Uttarakhand", district: "Nainital", block: "Bhimtal" },
    { state: "Uttarakhand", district: "Nainital", block: "Dhari" },
    { state: "Uttarakhand", district: "Nainital", block: "Haldwani" },
    { state: "Uttarakhand", district: "Nainital", block: "Kotabagh" },
    { state: "Uttarakhand", district: "Nainital", block: "Okhalkanda" },
    { state: "Uttarakhand", district: "Nainital", block: "Ramgarh" },
    { state: "Uttarakhand", district: "Nainital", block: "Ramnagar" },

    // 8. PAURI GARHWAL (15 Blocks)
    { state: "Uttarakhand", district: "Pauri Garhwal", block: "Bironkhal" },
    { state: "Uttarakhand", district: "Pauri Garhwal", block: "Dugadda" },
    { state: "Uttarakhand", district: "Pauri Garhwal", block: "Dwarikhal" },
    { state: "Uttarakhand", district: "Pauri Garhwal", block: "Ekeshwar" },
    { state: "Uttarakhand", district: "Pauri Garhwal", block: "Jaiharikhal" },
    { state: "Uttarakhand", district: "Pauri Garhwal", block: "Kaljikhal" },
    { state: "Uttarakhand", district: "Pauri Garhwal", block: "Khirsu" },
    { state: "Uttarakhand", district: "Pauri Garhwal", block: "Kot" },
    { state: "Uttarakhand", district: "Pauri Garhwal", block: "Pabo" },
    { state: "Uttarakhand", district: "Pauri Garhwal", block: "Pauri" },
    { state: "Uttarakhand", district: "Pauri Garhwal", block: "Pokhra" },
    { state: "Uttarakhand", district: "Pauri Garhwal", block: "Rikhnikhal" },
    { state: "Uttarakhand", district: "Pauri Garhwal", block: "Thalisain" },
    { state: "Uttarakhand", district: "Pauri Garhwal", block: "Yamkeshwar" },
    { state: "Uttarakhand", district: "Pauri Garhwal", block: "Nainidhand" },

    // 9. PITHORAGARH (8 Blocks)
    { state: "Uttarakhand", district: "Pithoragarh", block: "Berinag" },
    { state: "Uttarakhand", district: "Pithoragarh", block: "Dharchula" },
    { state: "Uttarakhand", district: "Pithoragarh", block: "Didihat" },
    { state: "Uttarakhand", district: "Pithoragarh", block: "Kanalichina" },
    { state: "Uttarakhand", district: "Pithoragarh", block: "Munsiari" },
    { state: "Uttarakhand", district: "Pithoragarh", block: "Gangolihat" },
    { state: "Uttarakhand", district: "Pithoragarh", block: "Munakot" },
    { state: "Uttarakhand", district: "Pithoragarh", block: "Bin" },

    // 10. RUDRAPRAYAG (3 Blocks)
    { state: "Uttarakhand", district: "Rudraprayag", block: "Augustmuni" },
    { state: "Uttarakhand", district: "Rudraprayag", block: "Jakholi" },
    { state: "Uttarakhand", district: "Rudraprayag", block: "Ukhimath" },

    // 11. TEHRI GARHWAL (9 Blocks)
    { state: "Uttarakhand", district: "Tehri Garhwal", block: "Chamba" },
    { state: "Uttarakhand", district: "Tehri Garhwal", block: "Devprayag" },
    { state: "Uttarakhand", district: "Tehri Garhwal", block: "Jakhnidhar" },
    { state: "Uttarakhand", district: "Tehri Garhwal", block: "Jaunpur" },
    { state: "Uttarakhand", district: "Tehri Garhwal", block: "Narendra Nagar" },
    { state: "Uttarakhand", district: "Tehri Garhwal", block: "Pratapnagar" },
    { state: "Uttarakhand", district: "Tehri Garhwal", block: "Thauldhar" },
    { state: "Uttarakhand", district: "Tehri Garhwal", block: "Bhilangna" },
    { state: "Uttarakhand", district: "Tehri Garhwal", block: "Kirtinagar" },

    // 12. UDHAM SINGH NAGAR (7 Blocks)
    { state: "Uttarakhand", district: "Udham Singh Nagar", block: "Bajpur" },
    { state: "Uttarakhand", district: "Udham Singh Nagar", block: "Gadarpur" },
    { state: "Uttarakhand", district: "Udham Singh Nagar", block: "Jaspur" },
    { state: "Uttarakhand", district: "Udham Singh Nagar", block: "Kashipur" },
    { state: "Uttarakhand", district: "Udham Singh Nagar", block: "Khatima" },
    { state: "Uttarakhand", district: "Udham Singh Nagar", block: "Rudrapur" },
    { state: "Uttarakhand", district: "Udham Singh Nagar", block: "Sitarganj" },

    // 13. UTTARKASHI (6 Blocks)
    { state: "Uttarakhand", district: "Uttarkashi", block: "Bhatwari" },
    { state: "Uttarakhand", district: "Uttarkashi", block: "Chinyalisaur" },
    { state: "Uttarakhand", district: "Uttarkashi", block: "Dunda" },
    { state: "Uttarakhand", district: "Uttarkashi", block: "Mori" },
    { state: "Uttarakhand", district: "Uttarkashi", block: "Naugaon" },
    { state: "Uttarakhand", district: "Uttarkashi", block: "Purola" }
];

module.exports = uttarakhandData;