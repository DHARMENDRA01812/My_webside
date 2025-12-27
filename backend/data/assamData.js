const assamData = [
    // 1. BAJALI (2 Blocks)
    { state: "Assam", district: "Bajali", block: "Bajali" },
    { state: "Assam", district: "Bajali", block: "Bhawanipur" },

    // 2. BAKSA (4 Blocks)
    { state: "Assam", district: "Baksa", block: "Baksa" },
    { state: "Assam", district: "Baksa", block: "Jaleswar" },
    { state: "Assam", district: "Baksa", block: "Tamulpur" },
    { state: "Assam", district: "Baksa", block: "Goreswar" },

    // 3. BARPETA (9 Blocks)
    { state: "Assam", district: "Barpeta", block: "Barpeta" },
    { state: "Assam", district: "Barpeta", block: "Bhabanipur" },
    { state: "Assam", district: "Barpeta", block: "Chakchaka" },
    { state: "Assam", district: "Barpeta", block: "Chenga" },
    { state: "Assam", district: "Barpeta", block: "Gobardhana" },
    { state: "Assam", district: "Barpeta", block: "Gomaphulbari" },
    { state: "Assam", district: "Barpeta", block: "Mandia" },
    { state: "Assam", district: "Barpeta", block: "Pakabetbari" },
    { state: "Assam", district: "Barpeta", block: "Rupsi" },

    // 4. BISWANATH (3 Blocks)
    { state: "Assam", district: "Biswanath", block: "Biswanath" },
    { state: "Assam", district: "Biswanath", block: "Baghmara" },
    { state: "Assam", district: "Biswanath", block: "Sakomatha" },

    // 5. BONGAIGAON (5 Blocks)
    { state: "Assam", district: "Bongaigaon", block: "Boitamari" },
    { state: "Assam", district: "Bongaigaon", block: "Dangtol" },
    { state: "Assam", district: "Bongaigaon", block: "Manikpur" },
    { state: "Assam", district: "Bongaigaon", block: "Srijangram" },
    { state: "Assam", district: "Bongaigaon", block: "Tapattary" },

    // 6. CACHAR (15 Blocks)
    { state: "Assam", district: "Cachar", block: "Banskandi" },
    { state: "Assam", district: "Cachar", block: "Baronabagram" },
    { state: "Assam", district: "Cachar", block: "Borkhola" },
    { state: "Assam", district: "Cachar", block: "Kalain" },
    { state: "Assam", district: "Cachar", block: "Katigorah" },
    { state: "Assam", district: "Cachar", block: "Lakhipur" },
    { state: "Assam", district: "Cachar", block: "Narsingpur" },
    { state: "Assam", district: "Cachar", block: "Palonghat" },
    { state: "Assam", district: "Cachar", block: "Rajabazar" },
    { state: "Assam", district: "Cachar", block: "Salchapra" },
    { state: "Assam", district: "Cachar", block: "Sonai" },
    { state: "Assam", district: "Cachar", block: "Tapang" },
    { state: "Assam", district: "Cachar", block: "Udharbond" },

    // 7. CHARAIDEO (2 Blocks)
    { state: "Assam", district: "Charaideo", block: "Lakwa" },
    { state: "Assam", district: "Charaideo", block: "Sapekhati" },

    // 8. CHIRANG (2 Blocks)
    { state: "Assam", district: "Chirang", block: "Borobazar" },
    { state: "Assam", district: "Chirang", block: "Sidli-Chirang" },

    // 9. DARRANG (6 Blocks)
    { state: "Assam", district: "Darrang", block: "Bechimari" },
    { state: "Assam", district: "Darrang", block: "Dalgaon-Sialmari" },
    { state: "Assam", district: "Darrang", block: "Kalaigaon" },
    { state: "Assam", district: "Darrang", block: "Pub-Mangaldai" },
    { state: "Assam", district: "Darrang", block: "Pachim-Mangaldai" },
    { state: "Assam", district: "Darrang", block: "Sipajhar" },

    // 10. DHEMAJI (5 Blocks)
    { state: "Assam", district: "Dhemaji", block: "Bordoloni" },
    { state: "Assam", district: "Dhemaji", block: "Dhemaji" },
    { state: "Assam", district: "Dhemaji", block: "Machkhowa" },
    { state: "Assam", district: "Dhemaji", block: "Murkongselek" },
    { state: "Assam", district: "Dhemaji", block: "Sissiborgaon" },

    // 11. DHUBRI (14 Blocks)
    { state: "Assam", district: "Dhubri", block: "Agomani" },
    { state: "Assam", district: "Dhubri", block: "Bilasipara" },
    { state: "Assam", district: "Dhubri", block: "Birshing Jarua" },
    { state: "Assam", district: "Dhubri", block: "Chapar-Salkocha" },
    { state: "Assam", district: "Dhubri", block: "Fakirganj" },
    { state: "Assam", district: "Dhubri", block: "Gauripur" },
    { state: "Assam", district: "Dhubri", block: "Golakganj" },
    { state: "Assam", district: "Dhubri", block: "Jamadarhat" },
    { state: "Assam", district: "Dhubri", block: "Mahamaya" },
    { state: "Assam", district: "Dhubri", block: "Mankachar" },
    { state: "Assam", district: "Dhubri", block: "Nayeralga" },
    { state: "Assam", district: "Dhubri", block: "Rupshi" },

    // 12. DIBRUGARH (7 Blocks)
    { state: "Assam", district: "Dibrugarh", block: "Barbaruah" },
    { state: "Assam", district: "Dibrugarh", block: "Itakhuli" },
    { state: "Assam", district: "Dibrugarh", block: "Joypur" },
    { state: "Assam", district: "Dibrugarh", block: "Khowang" },
    { state: "Assam", district: "Dibrugarh", block: "Lahoal" },
    { state: "Assam", district: "Dibrugarh", block: "Panitola" },
    { state: "Assam", district: "Dibrugarh", block: "Tengakhat" },

    // 13. DIMA HASAO (5 Blocks)
    { state: "Assam", district: "Dima Hasao", block: "Diyungbra" },
    { state: "Assam", district: "Dima Hasao", block: "Harangajao" },
    { state: "Assam", district: "Dima Hasao", block: "Jatinga Valley" },
    { state: "Assam", district: "Dima Hasao", block: "Mahur" },
    { state: "Assam", district: "Dima Hasao", block: "New Sangbar" },

    // 14. GOALPARA (8 Blocks)
    { state: "Assam", district: "Goalpara", block: "Balijana" },
    { state: "Assam", district: "Goalpara", block: "Jaleswar" },
    { state: "Assam", district: "Goalpara", block: "Kharmuza" },
    { state: "Assam", district: "Goalpara", block: "Krishnai" },
    { state: "Assam", district: "Goalpara", block: "Kuchdhowa" },
    { state: "Assam", district: "Goalpara", block: "Lakhipur" },
    { state: "Assam", district: "Goalpara", block: "Matia" },
    { state: "Assam", district: "Goalpara", block: "Rangjuli" },

    // 15. GOLAGHAT (8 Blocks)
    { state: "Assam", district: "Golaghat", block: "Golaghat Central" },
    { state: "Assam", district: "Golaghat", block: "Golaghat East" },
    { state: "Assam", district: "Golaghat", block: "Golaghat North" },
    { state: "Assam", district: "Golaghat", block: "Golaghat South" },
    { state: "Assam", district: "Golaghat", block: "Golaghat West" },
    { state: "Assam", district: "Golaghat", block: "Gamariguri" },
    { state: "Assam", district: "Golaghat", block: "Kakodonga" },
    { state: "Assam", district: "Golaghat", block: "Morongi" },

    // 16. HAILAKANDI (5 Blocks)
    { state: "Assam", district: "Hailakandi", block: "Algapur" },
    { state: "Assam", district: "Hailakandi", block: "Hailakandi" },
    { state: "Assam", district: "Hailakandi", block: "Katlicherra" },
    { state: "Assam", district: "Hailakandi", block: "Lala" },
    { state: "Assam", district: "Hailakandi", block: "South Hailakandi" },

    // 17. HOJAI (5 Blocks)
    { state: "Assam", district: "Hojai", block: "Binakandi" },
    { state: "Assam", district: "Hojai", block: "Dhalpukhuri" },
    { state: "Assam", district: "Hojai", block: "Jugijan" },
    { state: "Assam", district: "Hojai", block: "Lumbajong" },
    { state: "Assam", district: "Hojai", block: "Odali" },

    // 18. JORHAT (8 Blocks)
    { state: "Assam", district: "Jorhat", block: "Central Jorhat" },
    { state: "Assam", district: "Jorhat", block: "East Jorhat" },
    { state: "Assam", district: "Jorhat", block: "North Jorhat" },
    { state: "Assam", district: "Jorhat", block: "North West Jorhat" },
    { state: "Assam", district: "Jorhat", block: "South Jorhat" },
    { state: "Assam", district: "Jorhat", block: "Kaliapani" },
    { state: "Assam", district: "Jorhat", block: "Titabor" },
    { state: "Assam", district: "Jorhat", block: "Ujani Majuli" },

    // 19. KAMRUP RURAL (14 Blocks)
    { state: "Assam", district: "Kamrup Rural", block: "Bezera" },
    { state: "Assam", district: "Kamrup Rural", block: "Bihdia-Jajikona" },
    { state: "Assam", district: "Kamrup Rural", block: "Boko" },
    { state: "Assam", district: "Kamrup Rural", block: "Chamaria" },
    { state: "Assam", district: "Kamrup Rural", block: "Chaygaon" },
    { state: "Assam", district: "Kamrup Rural", block: "Goroimari" },
    { state: "Assam", district: "Kamrup Rural", block: "Hajo" },
    { state: "Assam", district: "Kamrup Rural", block: "Kamalpur" },
    { state: "Assam", district: "Kamrup Rural", block: "Pachim Chamaria" },
    { state: "Assam", district: "Kamrup Rural", block: "Rampur" },
    { state: "Assam", district: "Kamrup Rural", block: "Rangia" },
    { state: "Assam", district: "Kamrup Rural", block: "Sualkuchi" },

    // 20. KAMRUP METRO (2 Blocks)
    { state: "Assam", district: "Kamrup Metro", block: "Chandrapur" },
    { state: "Assam", district: "Kamrup Metro", block: "Dimoria" },

    // 21. KARBI ANGLONG (7 Blocks)
    { state: "Assam", district: "Karbi Anglong", block: "Howraghat" },
    { state: "Assam", district: "Karbi Anglong", block: "Langsomepi" },
    { state: "Assam", district: "Karbi Anglong", block: "Lumbajong" },
    { state: "Assam", district: "Karbi Anglong", block: "Nilip" },
    { state: "Assam", district: "Karbi Anglong", block: "Rongmongwe" },
    { state: "Assam", district: "Karbi Anglong", block: "Samelangso" },
    { state: "Assam", district: "Karbi Anglong", block: "Socheng Dhenta" },

    // 22. WEST KARBI ANGLONG (4 Blocks)
    { state: "Assam", district: "West Karbi Anglong", block: "Amri" },
    { state: "Assam", district: "West Karbi Anglong", block: "Chinthong" },
    { state: "Assam", district: "West Karbi Anglong", block: "Rongkhang" },
    { state: "Assam", district: "West Karbi Anglong", block: "Socheng" },

    // 23. KARIMGANJ (7 Blocks)
    { state: "Assam", district: "Karimganj", block: "Badarpur" },
    { state: "Assam", district: "Karimganj", block: "Dullavcherra" },
    { state: "Assam", district: "Karimganj", block: "Lowairpoa" },
    { state: "Assam", district: "Karimganj", block: "North Karimganj" },
    { state: "Assam", district: "Karimganj", block: "Patharkandi" },
    { state: "Assam", district: "Karimganj", block: "Ramkrishna Nagar" },
    { state: "Assam", district: "Karimganj", block: "South Karimganj" },

    // 24. KOKRAJHAR (5 Blocks)
    { state: "Assam", district: "Kokrajhar", block: "Dotma" },
    { state: "Assam", district: "Kokrajhar", block: "Gossaigaon" },
    { state: "Assam", district: "Kokrajhar", block: "Hatidhura" },
    { state: "Assam", district: "Kokrajhar", block: "Kachugaon" },
    { state: "Assam", district: "Kokrajhar", block: "Kokrajhar" },

    // 25. LAKHIMPUR (9 Blocks)
    { state: "Assam", district: "Lakhimpur", block: "Bihpuria" },
    { state: "Assam", district: "Lakhimpur", block: "Dhakuakhana" },
    { state: "Assam", district: "Lakhimpur", block: "Ghilamara" },
    { state: "Assam", district: "Lakhimpur", block: "Karunabari" },
    { state: "Assam", district: "Lakhimpur", block: "Lakhimpur" },
    { state: "Assam", district: "Lakhimpur", block: "Narayanpur" },
    { state: "Assam", district: "Lakhimpur", block: "Nowboicha" },
    { state: "Assam", district: "Lakhimpur", block: "Telahi" },

    // 26. MAJULI (2 Blocks)
    { state: "Assam", district: "Majuli", block: "Majuli" },
    { state: "Assam", district: "Majuli", block: "Ujani Majuli" },

    // 27. MORIGAON (5 Blocks)
    { state: "Assam", district: "Morigaon", block: "Bhurbandha" },
    { state: "Assam", district: "Morigaon", block: "Dolongghat" },
    { state: "Assam", district: "Morigaon", block: "Kapili" },
    { state: "Assam", district: "Morigaon", block: "Lahorighat" },
    { state: "Assam", district: "Morigaon", block: "Mayang" },

    // 28. NAGAON (18 Blocks)
    { state: "Assam", district: "Nagaon", block: "Bajiagaon" },
    { state: "Assam", district: "Nagaon", block: "Barhampur" },
    { state: "Assam", district: "Nagaon", block: "Batadrava" },
    { state: "Assam", district: "Nagaon", block: "Dolongghat" },
    { state: "Assam", district: "Nagaon", block: "Jugijan" },
    { state: "Assam", district: "Nagaon", block: "Juriah" },
    { state: "Assam", district: "Nagaon", block: "Kaliabor" },
    { state: "Assam", district: "Nagaon", block: "Kathiatoli" },
    { state: "Assam", district: "Nagaon", block: "Khagarijan" },
    { state: "Assam", district: "Nagaon", block: "Lahoarighat" },
    { state: "Assam", district: "Nagaon", block: "Lawkhowa" },
    { state: "Assam", district: "Nagaon", block: "Pachim Kaliabor" },
    { state: "Assam", district: "Nagaon", block: "Raha" },
    { state: "Assam", district: "Nagaon", block: "Rupahihat" },

    // 29. NALBARI (7 Blocks)
    { state: "Assam", district: "Nalbari", block: "Barkhetri" },
    { state: "Assam", district: "Nalbari", block: "Barigog Banbhag" },
    { state: "Assam", district: "Nalbari", block: "Madhipur" },
    { state: "Assam", district: "Nalbari", block: "Paschim Nalbari" },
    { state: "Assam", district: "Nalbari", block: "Pub Nalbari" },
    { state: "Assam", district: "Pub Nalbari", block: "Tihu" },

    // 30. SIVASAGAR (6 Blocks)
    { state: "Assam", district: "Sivasagar", block: "Amguri" },
    { state: "Assam", district: "Sivasagar", block: "Demow" },
    { state: "Assam", district: "Sivasagar", block: "Gaurisagar" },
    { state: "Assam", district: "Sivasagar", block: "Nazira" },
    { state: "Assam", district: "Sivasagar", block: "Sivasagar" },

    // 31. SONITPUR (7 Blocks)
    { state: "Assam", district: "Sonitpur", block: "Balipara" },
    { state: "Assam", district: "Sonitpur", block: "Bihaguri" },
    { state: "Assam", district: "Sonitpur", block: "Borsola" },
    { state: "Assam", district: "Sonitpur", block: "Dhekiajuli" },
    { state: "Assam", district: "Sonitpur", block: "Gabharu" },
    { state: "Assam", district: "Sonitpur", block: "Naduar" },
    { state: "Assam", district: "Sonitpur", block: "Rangapara" },

    // 32. SOUTH SALMARA-MANKACHAR (2 Blocks)
    { state: "Assam", district: "SS Mankachar", block: "Mankachar" },
    { state: "Assam", district: "SS Mankachar", block: "South Salmara" },

    // 33. TINSUKIA (7 Blocks)
    { state: "Assam", district: "Tinsukia", block: "Guijan" },
    { state: "Assam", district: "Tinsukia", block: "Hapjan" },
    { state: "Assam", district: "Tinsukia", block: "Itakhuli" },
    { state: "Assam", district: "Tinsukia", block: "Kakopathar" },
    { state: "Assam", district: "Tinsukia", block: "Margherita" },
    { state: "Assam", district: "Tinsukia", block: "Sadiya" },
    { state: "Assam", district: "Tinsukia", block: "Tinsukia" },

    // 34. UDALGURI (6 Blocks)
    { state: "Assam", district: "Udalguri", block: "Bhergaon" },
    { state: "Assam", district: "Udalguri", block: "Kalaigaon" },
    { state: "Assam", district: "Udalguri", block: "Khoirabari" },
    { state: "Assam", district: "Udalguri", block: "Mazbat" },
    { state: "Assam", district: "Udalguri", block: "Odalguri" },
    { state: "Assam", district: "Udalguri", block: "Rowta" },

    // 35. TAMULPUR (2 Blocks)
    { state: "Assam", district: "Tamulpur", block: "Tamulpur" },
    { state: "Assam", district: "Tamulpur", block: "Goreswar" }
];

module.exports = assamData;