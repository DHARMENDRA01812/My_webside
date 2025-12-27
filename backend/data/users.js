const users = [
  {
    name: 'System Admin',
    email: 'admin@example.com', // या admin@gmail.com (जो आप चाहें)
    password: '123456',         // ✅ यहाँ सिर्फ 123456 लिखें
    isAdmin: true,
    isDistrictAdmin: false,
    isShopOwner: false,
  },
  {
    name: 'District Admin',
    email: 'district@example.com', // ✅ यही ईमेल लॉगिन में इस्तेमाल करें
    password: '123456',            // ✅ यहाँ सिर्फ 123456 लिखें
    isAdmin: false,
    isDistrictAdmin: true,
    isShopOwner: false,
  },
  {
    name: 'Normal User',
    email: 'user@example.com',
    password: '123456',
    isAdmin: false,
    isDistrictAdmin: false,
    isShopOwner: false,
  },
];

module.exports = users;