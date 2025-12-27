const telanganaData = [
    // 1. ADILABAD (18 Mandals)
    { state: "Telangana", district: "Adilabad", block: "Adilabad Urban" },
    { state: "Telangana", district: "Adilabad", block: "Adilabad Rural" },
    { state: "Telangana", district: "Adilabad", block: "Bazarhathnoor" },
    { state: "Telangana", district: "Adilabad", block: "Bela" },
    { state: "Telangana", district: "Adilabad", block: "Boath" },
    { state: "Telangana", district: "Adilabad", block: "Inderavelly" },
    { state: "Telangana", district: "Adilabad", block: "Utnoor" },

    // 2. BHADRADRI KOTHAGUDEM (23 Mandals)
    { state: "Telangana", district: "Bhadradri Kothagudem", block: "Kothagudem" },
    { state: "Telangana", district: "Bhadradri Kothagudem", block: "Bhadrachalam" },
    { state: "Telangana", district: "Bhadradri Kothagudem", block: "Palwancha" },
    { state: "Telangana", district: "Bhadradri Kothagudem", block: "Manuguru" },
    { state: "Telangana", district: "Bhadradri Kothagudem", block: "Yellandu" },

    // 3. HYDERABAD (16 Mandals)
    { state: "Telangana", district: "Hyderabad", block: "Amberpet" },
    { state: "Telangana", district: "Hyderabad", block: "Asifnagar" },
    { state: "Telangana", district: "Hyderabad", block: "Bahadurpura" },
    { state: "Telangana", district: "Hyderabad", block: "Charminar" },
    { state: "Telangana", district: "Hyderabad", block: "Khairatabad" },
    { state: "Telangana", district: "Hyderabad", block: "Saidabad" },

    // 4. JAGTIAL (18 Mandals)
    { state: "Telangana", district: "Jagtial", block: "Jagtial" },
    { state: "Telangana", district: "Jagtial", block: "Korutla" },
    { state: "Telangana", district: "Jagtial", block: "Metpally" },
    { state: "Telangana", district: "Jagtial", block: "Raikal" },

    // 5. JANGAON (12 Mandals)
    { state: "Telangana", district: "Jangaon", block: "Jangaon" },
    { state: "Telangana", district: "Jangaon", block: "Station Ghanpur" },
    { state: "Telangana", district: "Jangaon", block: "Palakurthi" },

    // 6. JAYASHANKAR BHUPALPALLY (11 Mandals)
    { state: "Telangana", district: "Jayashankar Bhupalpally", block: "Bhupalpally" },
    { state: "Telangana", district: "Jayashankar Bhupalpally", block: "Kataram" },
    { state: "Telangana", district: "Jayashankar Bhupalpally", block: "Mahadevpur" },

    // 7. JOGULAMBA GADWAL (12 Mandals)
    { state: "Telangana", district: "Jogulamba Gadwal", block: "Gadwal" },
    { state: "Telangana", district: "Jogulamba Gadwal", block: "Alampur" },
    { state: "Telangana", district: "Jogulamba Gadwal", block: "Shantinagar" },

    // 8. KAMAREDDY (22 Mandals)
    { state: "Telangana", district: "Kamareddy", block: "Kamareddy" },
    { state: "Telangana", district: "Kamareddy", block: "Banswada" },
    { state: "Telangana", district: "Kamareddy", block: "Yareddy" },

    // 9. KARIMNAGAR (16 Mandals)
    { state: "Telangana", district: "Karimnagar", block: "Karimnagar" },
    { state: "Telangana", district: "Karimnagar", block: "Choppadandi" },
    { state: "Telangana", district: "Karimnagar", block: "Huzurabad" },
    { state: "Telangana", district: "Karimnagar", block: "Manakondur" },

    // 10. KHAMMAM (21 Mandals)
    { state: "Telangana", district: "Khammam", block: "Khammam Urban" },
    { state: "Telangana", district: "Khammam", block: "Khammam Rural" },
    { state: "Telangana", district: "Khammam", block: "Wyra" },
    { state: "Telangana", district: "Khammam", block: "Sathupally" },
    { state: "Telangana", district: "Khammam", block: "Madhira" },

    // 11. KUMURAM BHEEM ASIFABAD (15 Mandals)
    { state: "Telangana", district: "Asifabad", block: "Asifabad" },
    { state: "Telangana", district: "Asifabad", block: "Sirpur" },
    { state: "Telangana", district: "Asifabad", block: "Kagaznagar" },

    // 12. MAHABUBABAD (16 Mandals)
    { state: "Telangana", district: "Mahabubabad", block: "Mahabubabad" },
    { state: "Telangana", district: "Mahabubabad", block: "Dornakal" },
    { state: "Telangana", district: "Mahabubabad", block: "Thor rur" },

    // 13. MAHABUBNAGAR (26 Mandals)
    { state: "Telangana", district: "Mahabubnagar", block: "Mahabubnagar" },
    { state: "Telangana", district: "Mahabubnagar", block: "Jadcherla" },
    { state: "Telangana", district: "Mahabubnagar", block: "Devarkadra" },

    // 14. MANCHERIAL (18 Mandals)
    { state: "Telangana", district: "Mancherial", block: "Mancherial" },
    { state: "Telangana", district: "Mancherial", block: "Bellampally" },
    { state: "Telangana", district: "Mancherial", block: "Chennur" },

    // 15. MEDAK (20 Mandals)
    { state: "Telangana", district: "Medak", block: "Medak" },
    { state: "Telangana", district: "Medak", block: "Tupran" },
    { state: "Telangana", district: "Medak", block: "Narsapur" },

    // 16. MEDCHAL-MALKAJGIRI (15 Mandals)
    { state: "Telangana", district: "Medchal-Malkajgiri", block: "Medchal" },
    { state: "Telangana", district: "Medchal-Malkajgiri", block: "Malkajgiri" },
    { state: "Telangana", district: "Medchal-Malkajgiri", block: "Uppal" },
    { state: "Telangana", district: "Medchal-Malkajgiri", block: "Kukatpally" },
    { state: "Telangana", district: "Medchal-Malkajgiri", block: "Quthbullapur" },

    // 17. MULUGU (9 Mandals)
    { state: "Telangana", district: "Mulugu", block: "Mulugu" },
    { state: "Telangana", district: "Mulugu", block: "Eturnagaram" },
    { state: "Telangana", district: "Mulugu", block: "Venkatapur" },

    // 18. NAGARKURNOOL (20 Mandals)
    { state: "Telangana", district: "Nagarkurnool", block: "Nagarkurnool" },
    { state: "Telangana", district: "Nagarkurnool", block: "Achampet" },
    { state: "Telangana", district: "Nagarkurnool", block: "Kalwakurthy" },
    { state: "Telangana", district: "Nagarkurnool", block: "Kollapur" },

    // 19. NALGONDA (31 Mandals)
    { state: "Telangana", district: "Nalgonda", block: "Nalgonda" },
    { state: "Telangana", district: "Nalgonda", block: "Miryalaguda" },
    { state: "Telangana", district: "Nalgonda", block: "Devarakonda" },
    { state: "Telangana", district: "Nalgonda", block: "Nakrekal" },

    // 20. NARAYANPET (11 Mandals)
    { state: "Telangana", district: "Narayanpet", block: "Narayanpet" },
    { state: "Telangana", district: "Narayanpet", block: "Kosgi" },
    { state: "Telangana", district: "Narayanpet", block: "Makthal" },

    // 21. NIRMAL (19 Mandals)
    { state: "Telangana", district: "Nirmal", block: "Nirmal" },
    { state: "Telangana", district: "Nirmal", block: "Bhainsa" },
    { state: "Telangana", district: "Nirmal", block: "Khanapur" },

    // 22. NIZAMABAD (27 Mandals)
    { state: "Telangana", district: "Nizamabad", block: "Nizamabad North" },
    { state: "Telangana", district: "Nizamabad", block: "Nizamabad South" },
    { state: "Telangana", district: "Nizamabad", block: "Armoor" },
    { state: "Telangana", district: "Nizamabad", block: "Bodhan" },

    // 23. PEDDAPALLI (14 Mandals)
    { state: "Telangana", district: "Peddapalli", block: "Peddapalli" },
    { state: "Telangana", district: "Peddapalli", block: "Ramagundam" },
    { state: "Telangana", district: "Peddapalli", block: "Manthani" },

    // 24. RAJANNA SIRCILLA (13 Mandals)
    { state: "Telangana", district: "Rajanna Sircilla", block: "Sircilla" },
    { state: "Telangana", district: "Rajanna Sircilla", block: "Vemulawada" },

    // 25. RANGAREDDY (27 Mandals)
    { state: "Telangana", district: "Rangareddy", block: "Ibrahimpatnam" },
    { state: "Telangana", district: "Rangareddy", block: "Maheshwaram" },
    { state: "Telangana", district: "Rangareddy", block: "Rajendranagar" },
    { state: "Telangana", district: "Rangareddy", block: "Shadnagar" },

    // 26. SANGAREDDY (26 Mandals)
    { state: "Telangana", district: "Sangareddy", block: "Sangareddy" },
    { state: "Telangana", district: "Sangareddy", block: "Patancheru" },
    { state: "Telangana", district: "Sangareddy", block: "Zaheerabad" },
    { state: "Telangana", district: "Sangareddy", block: "Narayankhed" },

    // 27. SIDDIPET (22 Mandals)
    { state: "Telangana", district: "Siddipet", block: "Siddipet" },
    { state: "Telangana", district: "Siddipet", block: "Gajwel" },
    { state: "Telangana", district: "Siddipet", block: "Husnabad" },
    { state: "Telangana", district: "Siddipet", block: "Dubbak" },

    // 28. SURYAPET (23 Mandals)
    { state: "Telangana", district: "Suryapet", block: "Suryapet" },
    { state: "Telangana", district: "Suryapet", block: "Kodad" },
    { state: "Telangana", district: "Suryapet", block: "Huzurnagar" },

    // 29. VIKARABAD (18 Mandals)
    { state: "Telangana", district: "Vikarabad", block: "Vikarabad" },
    { state: "Telangana", district: "Vikarabad", block: "Tandur" },
    { state: "Telangana", district: "Vikarabad", block: "Pargi" },

    // 30. WANAPARTHY (14 Mandals)
    { state: "Telangana", district: "Wanaparthy", block: "Wanaparthy" },
    { state: "Telangana", district: "Wanaparthy", block: "Pebbair" },

    // 31. HANAMKONDA (14 Mandals)
    { state: "Telangana", district: "Hanamkonda", block: "Hanamkonda" },
    { state: "Telangana", district: "Hanamkonda", block: "Kazipet" },
    { state: "Telangana", district: "Hanamkonda", block: "Kamalapur" },

    // 32. WARANGAL (15 Mandals)
    { state: "Telangana", district: "Warangal", block: "Warangal" },
    { state: "Telangana", district: "Warangal", block: "Narsampet" },
    { state: "Telangana", district: "Warangal", block: "Wardhannapet" },

    // 33. YADADRI BHUVANAGIRI (17 Mandals)
    { state: "Telangana", district: "Yadadri Bhuvanagiri", block: "Bhuvanagiri" },
    { state: "Telangana", district: "Yadadri Bhuvanagiri", block: "Alair" },
    { state: "Telangana", district: "Yadadri Bhuvanagiri", block: "Choutuppal" },
    { state: "Telangana", district: "Yadadri Bhuvanagiri", block: "Bhongir" }
];

module.exports = telanganaData;