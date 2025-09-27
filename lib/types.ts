// TypeScript types for the Turf Customs mock backend

export interface User {
  id: string;
  name: string;
  email: string;
  contactNumber: string;
  ageGroup: string;
  state: string;
  city: string;
  // Store hashed password only
  passwordHash: string;
  // Stats
  gamesHosted: number;
  gamesAttended: number;
}

export interface Game {
  id: string;
  sport: string;
  venue: string;
  state: string;
  city: string;
  date: string; // ISO date e.g., 2025-09-25
  time: string; // 24h time e.g., 18:00
  ageGroup: string;
  playersNeeded: number;
  costPerPlayer: number;
  note?: string;
  createdBy: string; // user id
  players: string[]; // user ids
}

// City tiers for filtering
export interface CityTier {
  tier1: string[];
  tier2: string[];
  tier3: string[];
}

// State and city data
export const STATE_CITIES: Record<string, CityTier> = {
  "Maharashtra": {
    tier1: ["Mumbai", "Pune", "Nagpur"],
    tier2: ["Nashik", "Aurangabad", "Solapur", "Amravati", "Kolhapur"],
    tier3: ["Sangli", "Malegaon", "Jalgaon", "Akola", "Latur", "Ahmadnagar", "Dhule", "Ichalkaranji", "Parbhani", "Jalna", "Bhusawal", "Panvel", "Satara", "Beed", "Yavatmal", "Kamptee", "Gondia", "Barshi", "Achalpur", "Osmanabad", "Nanded-Waghala", "Wardha", "Udgir", "Aurangabad", "Amalner", "Akot", "Pandharpur", "Shrirampur", "Parli", "Wani", "Lonavla", "Talegaon Dabhade", "Anjangaon", "Umred", "Palghar", "Shegaon", "Ozar", "Phaltan", "Yevla", "Shahade", "Vita", "Umarkhed", "Amaravati", "Achalpur", "Jalgaon", "Lonavla", "Pandharpur", "Shrirampur", "Parli", "Wani", "Lonavla", "Talegaon Dabhade", "Anjangaon", "Umred", "Palghar", "Shegaon", "Ozar", "Phaltan", "Yevla", "Shahade", "Vita", "Umarkhed"]
  },
  "Delhi": {
    tier1: ["New Delhi", "Delhi"],
    tier2: ["Gurgaon", "Noida", "Faridabad", "Ghaziabad"],
    tier3: ["Sonipat", "Panipat", "Karnal", "Rohtak", "Hisar", "Ambala", "Yamunanagar", "Kurukshetra", "Rewari", "Jhajjar", "Bhiwani", "Mahendragarh", "Palwal", "Mewat", "Fatehabad", "Sirsa", "Jind", "Kaithal", "Panchkula", "Bhiwani"]
  },
  "Karnataka": {
    tier1: ["Bangalore", "Mysore", "Hubli-Dharwad"],
    tier2: ["Mangalore", "Belgaum", "Gulbarga", "Davanagere", "Bellary", "Bijapur", "Shimoga", "Tumkur", "Raichur", "Bidar", "Hospet", "Hassan", "Mandya", "Chitradurga", "Kolar", "Gangawati", "Robertson Pet", "Bagalkot", "Dharwad", "Ranebennur", "Hoskote", "Gokak", "Yadgir", "Karwar", "Kodagu", "Hampi", "Gadag-Betigeri", "Chikmagalur", "Koppal", "Chamrajanagar", "Maddur", "Malavalli", "Sira", "Tiptur", "Tarikere", "Kudligi", "Krishnarajpet", "Shorapur", "Yelandur", "Mudhol", "Sidlaghatta", "Sakleshpur", "Srinivaspur", "Ron", "Mundargi", "Sagar", "Piriyapatna", "Advi", "Afzalpur", "Ainapur", "Aland", "Alnavar", "Alur", "Anekal", "Ankola", "Annigeri", "Arkalgud", "Arsikere", "Athni", "Aurad", "Bableshwar", "Badami", "Bagalkot", "Bagepalli", "Bail Hongal", "Baindur", "Bajpe", "Bakshi", "Balki", "Ballari", "Banavar", "Bangarapet", "Bantval", "Bapujinagar", "Basavakalyan", "Basavana Bagevadi", "Belagavi", "Belakavadi", "Bellary", "Beltangadi", "Belur", "Bhadravati", "Bhalki", "Bhatkal", "Bidar", "Bijapur", "Bilgi", "Birur", "Bommanahalli", "Bommasandra", "Byadgi", "Byatarayanapura", "Challakere", "Chamarajanagar", "Chamrajnagar", "Channagiri", "Channapatna", "Channarayapatna", "Chickballapur", "Chikballapur", "Chikkaballapur", "Chikmagalur", "Chincholi", "Chintamani", "Chitradurga", "Chitapur", "Chittapur", "Dandeli", "Davanagere", "Devanhalli", "Devar Hippargi", "Dharwad", "Dod Ballapur", "Doddaballapur", "Gadag", "Gajendragad", "Gangawati", "Gauribidanur", "Gokak", "Gokarna", "Gonikoppal", "Gorur", "Gubbi", "Gudibanda", "Gulbarga", "Gundlupet", "Gurmatkal", "Haliyal", "Hampi", "Hanagal", "Hangal", "Harapanahalli", "Harihar", "Hassan", "Haveri", "Hebbagodi", "Hebbalu", "Heggadadevankote", "Hirekerur", "Hiriyur", "Holalkere", "Hole Narsipur", "Homnabad", "Honavar", "Honnali", "Hosakote", "Hosanagara", "Hosdurga", "Hoskote", "Hospet", "Hubli", "Hukeri", "Humnabad", "Hungund", "Hunsur", "Ilkal", "Indi", "Jagalur", "Jamkhandi", "Jevargi", "Joida", "Kadur", "Kalaburagi", "Kalagi", "Kalghatgi", "Kamalapuram", "Kampli", "Kanakapura", "Kannur", "Karkala", "Karwar", "Kavalur", "Kerur", "Khanapur", "Kodagu", "Kodlipet", "Kolar", "Kollegal", "Koppal", "Koratagere", "Kotturu", "Krishnarajanagar", "Krishnarajpet", "Kudchi", "Kudligi", "Kumta", "Kundapura", "Kundgol", "Kunigal", "Kuruburu", "Kushtagi", "Kyathasandra", "Lakshmeshwar", "Lingsugur", "Lokapur", "Maddur", "Madhugiri", "Madikeri", "Magadi", "Malavalli", "Malur", "Mandya", "Mangalore", "Manvi", "Moodbidri", "Muddebihal", "Mudhol", "Mudigere", "Mulbagal", "Mundargi", "Mysore", "Nagamangala", "Nanjangud", "Nargund", "Navalgund", "Nelamangala", "Nippani", "Nitte", "Nyamati", "Pandavapura", "Pavagada", "Piriyapatna", "Ponnampet", "Puttur", "Rabkavi Banhatti", "Raichur", "Ramanagaram", "Ramdurg", "Ranibennur", "Raybag", "Robertson Pet", "Ron", "Sadalagi", "Sagar", "Sakleshpur", "Sangamner", "Sankeshwar", "Sargur", "Sathyamangala", "Saundatti", "Savanur", "Sedam", "Shahabad", "Shahpur", "Shaktinagar", "Shiggaon", "Shikaripur", "Shimoga", "Shirhatti", "Shorapur", "Shrirangapattana", "Sidlaghatta", "Sindgi", "Sindhnur", "Sira", "Sirsi", "Siruguppa", "Someshwara", "Somvarpet", "Sorab", "Sringeri", "Srinivaspur", "Sulya", "Suntikoppa", "Talikota", "Tarikere", "Tekkalakote", "Terdal", "Tiptur", "Tirthahalli", "Tumkur", "Turuvekere", "Udupi", "Ullal", "Uttara Kannada", "Vijayapura", "Virajpet", "Wadi", "Yadgir", "Yelahanka", "Yelandur", "Yelbarga", "Yellapur", "Yemkanmardi"]
  },
  "Tamil Nadu": {
    tier1: ["Chennai", "Coimbatore", "Madurai"],
    tier2: ["Tiruchirappalli", "Salem", "Tirunelveli", "Tiruppur", "Erode", "Vellore", "Thoothukkudi", "Dindigul", "Thanjavur", "Ranipet", "Sivakasi", "Karur", "Udhagamandalam", "Hosur", "Nagercoil", "Kanchipuram", "Cuddalore", "Kumbakonam", "Tiruvannamalai", "Pollachi", "Rajapalayam", "Gobichettipalayam", "Pudukkottai", "Vaniyambadi", "Ambur", "Nagapattinam", "Gudiyatham", "Tirupathur", "Tenkasi", "Cumbum", "Kovilpatti", "Mettupalayam", "Arakkonam", "Tiruvallur", "Palladam", "Tambaram", "Bhavani", "Pallavaram", "Kanchipuram", "Kumbakonam", "Tiruvannamalai", "Pollachi", "Rajapalayam", "Gobichettipalayam", "Pudukkottai", "Vaniyambadi", "Ambur", "Nagapattinam", "Gudiyatham", "Tirupathur", "Tenkasi", "Cumbum", "Kovilpatti", "Mettupalayam", "Arakkonam", "Tiruvallur", "Palladam", "Tambaram", "Bhavani", "Pallavaram"]
  },
  "Gujarat": {
    tier1: ["Ahmedabad", "Surat", "Vadodara"],
    tier2: ["Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar", "Nadiad", "Morbi", "Surendranagar", "Bharuch", "Vapi", "Gandhidham", "Veraval", "Navsari", "Bardoli", "Palanpur", "Patan", "Anand", "Mehsana", "Bharuch", "Godhra", "Porbandar", "Ankleshwar", "Dahod", "Botad", "Amreli", "Deesa", "Jetpur", "Gondal", "Dhoraji", "Wadhwan", "Mahuva", "Kheda", "Kapadvanj", "Lunawada", "Mansa", "Umbergaon", "Talaja", "Mangrol", "Vejalpur", "Padra", "Limbdi", "Mahuva", "Wankaner", "Dakor", "Dholka", "Halvad", "Nadiad", "Palanpur", "Patan", "Anand", "Mehsana", "Bharuch", "Godhra", "Porbandar", "Ankleshwar", "Dahod", "Botad", "Amreli", "Deesa", "Jetpur", "Gondal", "Dhoraji", "Wadhwan", "Mahuva", "Kheda", "Kapadvanj", "Lunawada", "Mansa", "Umbergaon", "Talaja", "Mangrol", "Vejalpur", "Padra", "Limbdi", "Mahuva", "Wankaner", "Dakor", "Dholka", "Halvad"]
  },
  "Rajasthan": {
    tier1: ["Jaipur", "Jodhpur", "Udaipur"],
    tier2: ["Kota", "Bikaner", "Ajmer", "Bharatpur", "Bhilwara", "Alwar", "Sri Ganganagar", "Kishangarh", "Beawar", "Hanumangarh", "Dungarpur", "Sikar", "Pali", "Banswara", "Chittorgarh", "Sawai Madhopur", "Barmer", "Jhunjhunu", "Baran", "Jhalawar", "Dholpur", "Rajsamand", "Bundi", "Sirohi", "Pratapgarh", "Nagaur", "Tonk", "Jaisalmer", "Jalore", "Banswara", "Churu", "Dausa", "Karauli", "Sawai Madhopur", "Baran", "Jhalawar", "Dholpur", "Rajsamand", "Bundi", "Sirohi", "Pratapgarh", "Nagaur", "Tonk", "Jaisalmer", "Jalore", "Banswara", "Churu", "Dausa", "Karauli"]
  },
  "West Bengal": {
    tier1: ["Kolkata", "Howrah", "Durgapur"],
    tier2: ["Asansol", "Siliguri", "Bardhaman", "Malda", "Baharampur", "Habra", "Kharagpur", "Shantipur", "Dankuni", "Dhulian", "Ranaghat", "Haldia", "Raiganj", "Krishnanagar", "Nabadwip", "Medinipur", "Jalpaiguri", "Balurghat", "Basirhat", "Bankura", "Chakdaha", "Darjeeling", "Alipurduar", "Purulia", "Jangipur", "Bangaon", "Cooch Behar", "Kalna", "Murshidabad", "Baharampur", "Habra", "Kharagpur", "Shantipur", "Dankuni", "Dhulian", "Ranaghat", "Haldia", "Raiganj", "Krishnanagar", "Nabadwip", "Medinipur", "Jalpaiguri", "Balurghat", "Basirhat", "Bankura", "Chakdaha", "Darjeeling", "Alipurduar", "Purulia", "Jangipur", "Bangaon", "Cooch Behar", "Kalna", "Murshidabad"]
  },
  "Uttar Pradesh": {
    tier1: ["Lucknow", "Kanpur", "Agra"],
    tier2: ["Varanasi", "Meerut", "Allahabad", "Bareilly", "Ghaziabad", "Aligarh", "Moradabad", "Saharanpur", "Gorakhpur", "Firozabad", "Jhansi", "Muzaffarnagar", "Mathura", "Shahjahanpur", "Rampur", "Modinagar", "Hapur", "Etawah", "Mirzapur", "Bulandshahr", "Sambhal", "Amroha", "Hardoi", "Fatehpur", "Raebareli", "Orai", "Sitapur", "Bahraich", "Modinagar", "Hapur", "Etawah", "Mirzapur", "Bulandshahr", "Sambhal", "Amroha", "Hardoi", "Fatehpur", "Raebareli", "Orai", "Sitapur", "Bahraich"]
  },
  "Punjab": {
    tier1: ["Chandigarh", "Ludhiana", "Amritsar"],
    tier2: ["Jalandhar", "Patiala", "Bathinda", "Mohali", "Pathankot", "Moga", "Abohar", "Malerkotla", "Khanna", "Phagwara", "Muktsar", "Barnala", "Rajpura", "Firozpur", "Kapurthala", "Batala", "Sunam", "Nabha", "Fazilka", "Gurdaspur", "Sangrur", "Faridkot", "Fatehgarh Sahib", "Muktsar", "Barnala", "Rajpura", "Firozpur", "Kapurthala", "Batala", "Sunam", "Nabha", "Fazilka", "Gurdaspur", "Sangrur", "Faridkot", "Fatehgarh Sahib"]
  },
  "Haryana": {
    tier1: ["Gurgaon", "Faridabad", "Panipat"],
    tier2: ["Ambala", "Yamunanagar", "Rohtak", "Hisar", "Karnal", "Sonipat", "Bhiwani", "Sirsa", "Jhajjar", "Jind", "Fatehabad", "Rewari", "Palwal", "Mahendragarh", "Kaithal", "Panchkula", "Bhiwani", "Sirsa", "Jhajjar", "Jind", "Fatehabad", "Rewari", "Palwal", "Mahendragarh", "Kaithal", "Panchkula"]
  }
};

export interface AuthTokenPayload {
  userId: string;
  email: string;
  name: string;
}


