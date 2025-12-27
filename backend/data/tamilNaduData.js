const tamilNaduData = [
    // 1. CHENNAI (10 Talukas - Urban)
    { state: "Tamil Nadu", district: "Chennai", block: "Egmore" },
    { state: "Tamil Nadu", district: "Chennai", block: "Ayanavaram" },
    { state: "Tamil Nadu", district: "Chennai", block: "Aminjikarai" },
    { state: "Tamil Nadu", district: "Chennai", block: "Guindy" },
    { state: "Tamil Nadu", district: "Chennai", block: "Mylapore" },
    { state: "Tamil Nadu", district: "Chennai", block: "Tondiarpet" },

    // 2. COIMBATORE (12 Blocks)
    { state: "Tamil Nadu", district: "Coimbatore", block: "Annur" },
    { state: "Tamil Nadu", district: "Coimbatore", block: "Anamalai" },
    { state: "Tamil Nadu", district: "Coimbatore", block: "Madukkarai" },
    { state: "Tamil Nadu", district: "Coimbatore", block: "Karamadai" },
    { state: "Tamil Nadu", district: "Coimbatore", block: "Pollachi North" },
    { state: "Tamil Nadu", district: "Coimbatore", block: "Pollachi South" },
    { state: "Tamil Nadu", district: "Coimbatore", block: "Sarcarsamakulam" },
    { state: "Tamil Nadu", district: "Coimbatore", block: "Sultanpet" },
    { state: "Tamil Nadu", district: "Coimbatore", block: "Thondamuthur" },

    // 3. MADURAI (13 Blocks)
    { state: "Tamil Nadu", district: "Madurai", block: "Madurai East" },
    { state: "Tamil Nadu", district: "Madurai", block: "Madurai West" },
    { state: "Tamil Nadu", district: "Madurai", block: "Melur" },
    { state: "Tamil Nadu", district: "Madurai", block: "Vadipatti" },
    { state: "Tamil Nadu", district: "Madurai", block: "Alanganallur" },
    { state: "Tamil Nadu", district: "Madurai", block: "Thiruparankundram" },
    { state: "Tamil Nadu", district: "Madurai", block: "Kalligudi" },
    { state: "Tamil Nadu", district: "Madurai", block: "Tirumangalam" },
    { state: "Tamil Nadu", district: "Madurai", block: "Usilampatti" },

    // 4. TIRUCHIRAPPALLI (14 Blocks)
    { state: "Tamil Nadu", district: "Tiruchirappalli", block: "Lalgudi" },
    { state: "Tamil Nadu", district: "Tiruchirappalli", block: "Manachanallur" },
    { state: "Tamil Nadu", district: "Tiruchirappalli", block: "Musiri" },
    { state: "Tamil Nadu", district: "Tiruchirappalli", block: "Srirangam" },
    { state: "Tamil Nadu", district: "Tiruchirappalli", block: "Thiruverumbur" },
    { state: "Tamil Nadu", district: "Tiruchirappalli", block: "Thottiam" },
    { state: "Tamil Nadu", district: "Tiruchirappalli", block: "Uppiliapuram" },

    // 5. SALEM (20 Blocks)
    { state: "Tamil Nadu", district: "Salem", block: "Attur" },
    { state: "Tamil Nadu", district: "Salem", block: "Gangavalli" },
    { state: "Tamil Nadu", district: "Salem", block: "Mecheri" },
    { state: "Tamil Nadu", district: "Salem", block: "Mettur" },
    { state: "Tamil Nadu", district: "Salem", block: "Omalur" },
    { state: "Tamil Nadu", district: "Salem", block: "Salem" },
    { state: "Tamil Nadu", district: "Salem", block: "Yercaud" },

    // 6. KANCHIPURAM (5 Blocks)
    { state: "Tamil Nadu", district: "Kanchipuram", block: "Kanchipuram" },
    { state: "Tamil Nadu", district: "Kanchipuram", block: "Walajabad" },
    { state: "Tamil Nadu", district: "Kanchipuram", block: "Utthiramerur" },
    { state: "Tamil Nadu", district: "Kanchipuram", block: "Sriperumbudur" },
    { state: "Tamil Nadu", district: "Kanchipuram", block: "Kundrathur" },

    // 7. CHENGALPATTU (8 Blocks)
    { state: "Tamil Nadu", district: "Chengalpattu", block: "Chengalpattu" },
    { state: "Tamil Nadu", district: "Chengalpattu", block: "Kattankulathur" },
    { state: "Tamil Nadu", district: "Chengalpattu", block: "Madhuranthakam" },
    { state: "Tamil Nadu", district: "Chengalpattu", block: "Thiruporur" },
    { state: "Tamil Nadu", district: "Chengalpattu", block: "Tirukalukundram" },

    // 8. TIRUPPUR (13 Blocks)
    { state: "Tamil Nadu", district: "Tiruppur", block: "Avinashi" },
    { state: "Tamil Nadu", district: "Tiruppur", block: "Dharapuram" },
    { state: "Tamil Nadu", district: "Tiruppur", block: "Kangeyam" },
    { state: "Tamil Nadu", district: "Tiruppur", block: "Palladam" },
    { state: "Tamil Nadu", district: "Tiruppur", block: "Udumalaipettai" },

    // 9. ERODE (14 Blocks)
    { state: "Tamil Nadu", district: "Erode", block: "Bhavani" },
    { state: "Tamil Nadu", district: "Erode", block: "Erode" },
    { state: "Tamil Nadu", district: "Erode", block: "Gobichettipalayam" },
    { state: "Tamil Nadu", district: "Erode", block: "Kodumudi" },
    { state: "Tamil Nadu", district: "Erode", block: "Perundurai" },

    // 10. VELLORE (7 Blocks)
    { state: "Tamil Nadu", district: "Vellore", block: "Vellore" },
    { state: "Tamil Nadu", district: "Vellore", block: "Katpadi" },
    { state: "Tamil Nadu", district: "Vellore", block: "Gudiyatham" },
    { state: "Tamil Nadu", district: "Vellore", block: "Anaicut" },
    { state: "Tamil Nadu", district: "Vellore", block: "Kaniyambadi" },

    // 11. THANJAVUR (14 Blocks)
    { state: "Tamil Nadu", district: "Thanjavur", block: "Thanjavur" },
    { state: "Tamil Nadu", district: "Thanjavur", block: "Kumbakonam" },
    { state: "Tamil Nadu", district: "Thanjavur", block: "Papanasam" },
    { state: "Tamil Nadu", district: "Thanjavur", block: "Pattukkottai" },
    { state: "Tamil Nadu", district: "Thanjavur", block: "Orathanadu" },

    // 12. TIRUNELVELI (9 Blocks)
    { state: "Tamil Nadu", district: "Tirunelveli", block: "Ambasamudram" },
    { state: "Tamil Nadu", district: "Tirunelveli", block: "Nanguneri" },
    { state: "Tamil Nadu", district: "Tirunelveli", block: "Palayamkottai" },
    { state: "Tamil Nadu", district: "Tirunelveli", block: "Radhapuram" },
    { state: "Tamil Nadu", district: "Tirunelveli", block: "Valliyur" },

    // 13. KANYAKUMARI (9 Blocks)
    { state: "Tamil Nadu", district: "Kanyakumari", block: "Agastheeswaram" },
    { state: "Tamil Nadu", district: "Kanyakumari", block: "Killiyur" },
    { state: "Tamil Nadu", district: "Kanyakumari", block: "Munchirai" },
    { state: "Tamil Nadu", district: "Kanyakumari", block: "Thovalai" },
    { state: "Tamil Nadu", district: "Kanyakumari", block: "Thuckalay" },

    // 14. DINDIGUL (14 Blocks)
    { state: "Tamil Nadu", district: "Dindigul", block: "Dindigul" },
    { state: "Tamil Nadu", district: "Dindigul", block: "Kodaikanal" },
    { state: "Tamil Nadu", district: "Dindigul", block: "Natham" },
    { state: "Tamil Nadu", district: "Dindigul", block: "Palani" },
    { state: "Tamil Nadu", district: "Dindigul", block: "Oddanchatram" },

    // 15. THOOTHUKUDI (12 Blocks)
    { state: "Tamil Nadu", district: "Thoothukudi", block: "Thoothukudi" },
    { state: "Tamil Nadu", district: "Thoothukudi", block: "Kovilpatti" },
    { state: "Tamil Nadu", district: "Thoothukudi", block: "Tiruchendur" },
    { state: "Tamil Nadu", district: "Thoothukudi", block: "Eral" },
    { state: "Tamil Nadu", district: "Thoothukudi", block: "Ottapidaram" },

    // 16. CUDDALORE (14 Blocks)
    { state: "Tamil Nadu", district: "Cuddalore", block: "Cuddalore" },
    { state: "Tamil Nadu", district: "Cuddalore", block: "Chidambaram" },
    { state: "Tamil Nadu", district: "Cuddalore", block: "Kurinjipadi" },
    { state: "Tamil Nadu", district: "Cuddalore", block: "Panruti" },
    { state: "Tamil Nadu", district: "Cuddalore", block: "Virudhachalam" },

    // 17. VILLUPURAM (13 Blocks)
    { state: "Tamil Nadu", district: "Villupuram", block: "Gingee" },
    { state: "Tamil Nadu", district: "Villupuram", block: "Kandamangalam" },
    { state: "Tamil Nadu", district: "Villupuram", block: "Tindivanam" },
    { state: "Tamil Nadu", district: "Villupuram", block: "Villupuram" },

    // 18. KRISHNAGIRI (10 Blocks)
    { state: "Tamil Nadu", district: "Krishnagiri", block: "Hosur" },
    { state: "Tamil Nadu", district: "Krishnagiri", block: "Krishnagiri" },
    { state: "Tamil Nadu", district: "Krishnagiri", block: "Bargur" },
    { state: "Tamil Nadu", district: "Krishnagiri", block: "Shoolagiri" },

    // 19. DHARMAPURI (8 Blocks)
    { state: "Tamil Nadu", district: "Dharmapuri", block: "Dharmapuri" },
    { state: "Tamil Nadu", district: "Dharmapuri", block: "Harur" },
    { state: "Tamil Nadu", district: "Dharmapuri", block: "Pennagaram" },
    { state: "Tamil Nadu", district: "Dharmapuri", block: "Palacode" },

    // 20. NAMAKKAL (15 Blocks)
    { state: "Tamil Nadu", district: "Namakkal", block: "Namakkal" },
    { state: "Tamil Nadu", district: "Namakkal", block: "Rasipuram" },
    { state: "Tamil Nadu", district: "Namakkal", block: "Tiruchengode" },
    { state: "Tamil Nadu", district: "Namakkal", block: "Paramathi" },

    // 21. TIRUVANNAMALAI (18 Blocks)
    { state: "Tamil Nadu", district: "Tiruvannamalai", block: "Tiruvannamalai" },
    { state: "Tamil Nadu", district: "Tiruvannamalai", block: "Arani" },
    { state: "Tamil Nadu", district: "Tiruvannamalai", block: "Chengam" },
    { state: "Tamil Nadu", district: "Tiruvannamalai", block: "Polur" },

    // 22. PUDUKKOTTAI (13 Blocks)
    { state: "Tamil Nadu", district: "Pudukkottai", block: "Aranthangi" },
    { state: "Tamil Nadu", district: "Pudukkottai", block: "Pudukkottai" },
    { state: "Tamil Nadu", district: "Pudukkottai", block: "Gandarvakottai" },

    // 23. RAMANATHAPURAM (11 Blocks)
    { state: "Tamil Nadu", district: "Ramanathapuram", block: "Ramanathapuram" },
    { state: "Tamil Nadu", district: "Ramanathapuram", block: "Paramakudi" },
    { state: "Tamil Nadu", district: "Ramanathapuram", block: "Rameswaram" },

    // 24. SIVAGANGA (12 Blocks)
    { state: "Tamil Nadu", district: "Sivaganga", block: "Sivaganga" },
    { state: "Tamil Nadu", district: "Sivaganga", block: "Karaikudi" },
    { state: "Tamil Nadu", district: "Sivaganga", block: "Devakottai" },

    // 25. VIRUDHUNAGAR (11 Blocks)
    { state: "Tamil Nadu", district: "Virudhunagar", block: "Virudhunagar" },
    { state: "Tamil Nadu", district: "Virudhunagar", block: "Sivakasi" },
    { state: "Tamil Nadu", district: "Virudhunagar", block: "Rajapalayam" },

    // 26. THENI (8 Blocks)
    { state: "Tamil Nadu", district: "Theni", block: "Theni" },
    { state: "Tamil Nadu", district: "Theni", block: "Bodinayakanur" },
    { state: "Tamil Nadu", district: "Theni", block: "Periyakulam" },

    // 27. NILGIRIS (4 Blocks)
    { state: "Tamil Nadu", district: "Nilgiris", block: "Ooty" },
    { state: "Tamil Nadu", district: "Nilgiris", block: "Coonoor" },
    { state: "Tamil Nadu", district: "Nilgiris", block: "Gudalur" },
    { state: "Tamil Nadu", district: "Nilgiris", block: "Kotagiri" },

    // 28. ARIYALUR (6 Blocks)
    { state: "Tamil Nadu", district: "Ariyalur", block: "Ariyalur" },
    { state: "Tamil Nadu", district: "Ariyalur", block: "Sendurai" },
    { state: "Tamil Nadu", district: "Ariyalur", block: "Jayankondam" },

    // 29. PERAMBALUR (4 Blocks)
    { state: "Tamil Nadu", district: "Perambalur", block: "Perambalur" },
    { state: "Tamil Nadu", district: "Perambalur", block: "Veppanthattai" },
    { state: "Tamil Nadu", district: "Perambalur", block: "Alathur" },

    // 30. KARUR (8 Blocks)
    { state: "Tamil Nadu", district: "Karur", block: "Karur" },
    { state: "Tamil Nadu", district: "Karur", block: "Kulithalai" },
    { state: "Tamil Nadu", district: "Karur", block: "Aravakurichi" },

    // 31. NAGAPATTINAM (6 Blocks)
    { state: "Tamil Nadu", district: "Nagapattinam", block: "Nagapattinam" },
    { state: "Tamil Nadu", district: "Nagapattinam", block: "Kilvelur" },
    { state: "Tamil Nadu", district: "Nagapattinam", block: "Vedaranyam" },

    // 32. TIRUVALLUR (14 Blocks)
    { state: "Tamil Nadu", district: "Tiruvallur", block: "Tiruvallur" },
    { state: "Tamil Nadu", district: "Tiruvallur", block: "Poonamallee" },
    { state: "Tamil Nadu", district: "Tiruvallur", block: "Ambattur" },

    // 33. TIRUVARUR (10 Blocks)
    { state: "Tamil Nadu", district: "Tiruvarur", block: "Tiruvarur" },
    { state: "Tamil Nadu", district: "Tiruvarur", block: "Mannargudi" },
    { state: "Tamil Nadu", district: "Tiruvarur", block: "Thiruthuraipoondi" },

    // 34. RANIPET (7 Blocks)
    { state: "Tamil Nadu", district: "Ranipet", block: "Ranipet" },
    { state: "Tamil Nadu", district: "Ranipet", block: "Walajah" },
    { state: "Tamil Nadu", district: "Ranipet", block: "Arakkonam" },

    // 35. TIRUPATTUR (6 Blocks)
    { state: "Tamil Nadu", district: "Tirupattur", block: "Tirupattur" },
    { state: "Tamil Nadu", district: "Tirupattur", block: "Vaniyambadi" },
    { state: "Tamil Nadu", district: "Tirupattur", block: "Ambur" },

    // 36. TENKASI (10 Blocks)
    { state: "Tamil Nadu", district: "Tenkasi", block: "Tenkasi" },
    { state: "Tamil Nadu", district: "Tenkasi", block: "Sankarankovil" },
    { state: "Tamil Nadu", district: "Tenkasi", block: "Kadayanallur" },

    // 37. KALLAKURICHI (9 Blocks)
    { state: "Tamil Nadu", district: "Kallakurichi", block: "Kallakurichi" },
    { state: "Tamil Nadu", district: "Kallakurichi", block: "Sankarapuram" },
    { state: "Tamil Nadu", district: "Kallakurichi", block: "Ulundurpet" },

    // 38. MAYILADUTHURAI (5 Blocks)
    { state: "Tamil Nadu", district: "Mayiladuthurai", block: "Mayiladuthurai" },
    { state: "Tamil Nadu", district: "Mayiladuthurai", block: "Sirkazhi" },
    { state: "Tamil Nadu", district: "Mayiladuthurai", block: "Tharangambadi" }
];

module.exports = tamilNaduData;