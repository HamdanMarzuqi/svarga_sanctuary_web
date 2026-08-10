import type { BlogPost, GalleryItem, Room, Testimonial } from "@/types/content";

export const rooms: Room[] = [
  {
    id: "room-standard-01",
    slug: "standard",
    type: "standard",
    name: { id: "Kamar Standard", en: "Standard Room" },
    shortDescription: {
      id: "Kamar nyaman dengan dekorasi Jawa yang tenang dan pemandangan taman.",
      en: "A calm room with Javanese details and a view into the garden."
    },
    fullDescription: {
      id: "Kamar Standard Svarga Sanctuary dirancang untuk memberikan kenyamanan maksimal dengan sentuhan dekorasi tradisional Jawa. Dilengkapi dengan tempat tidur queen size, kamar mandi pribadi dengan air panas, serta pemandangan taman yang menenangkan.",
      en: "The Standard Room at Svarga Sanctuary is designed to provide maximum comfort with traditional Javanese decor. Featuring a queen-size bed, private bathroom with hot water, and a calming garden view."
    },
    price: { weekday: 350000, weekend: 450000, currency: "IDR" },
    capacity: { adults: 2, children: 1, maxTotal: 2 },
    size: 22,
    floor: 1,
    bedType: "Queen Size",
    image: "/images/rooms/premium-suite.jpg",
    imageAlt: {
      id: "Kamar Standard dengan tempat tidur queen dan dekorasi kayu",
      en: "Standard room with queen bed and wood details"
    },
    amenities: ["AC", "WiFi", "Kamar mandi pribadi", "Air panas", "TV", "Lemari"],
    highlights: [
      { id: "Dekorasi autentik Jawa", en: "Authentic Javanese decor" },
      { id: "Kamar mandi pribadi dengan air panas", en: "Private bathroom with hot water" },
      { id: "WiFi gratis", en: "Free WiFi" }
    ],
    isAvailable: true,
    isSample: true
  },
  {
    id: "room-deluxe-01",
    slug: "deluxe",
    type: "deluxe",
    name: { id: "Deluxe Garden View", en: "Deluxe Garden View" },
    shortDescription: {
      id: "Ruang lebih luas dengan teras pribadi yang menghadap taman tropis.",
      en: "A spacious room with a private terrace overlooking a tropical garden."
    },
    fullDescription: {
      id: "Kamar Deluxe kami menawarkan ruang yang lebih luas dengan teras pribadi menghadap taman tropis yang asri. Dilengkapi bathtub premium, tempat tidur king size, dan minibar untuk kenyamanan ekstra.",
      en: "Our Deluxe Room offers a more spacious layout with a private terrace overlooking a lush tropical garden. Featuring a premium bathtub, king-size bed, and minibar for extra comfort."
    },
    price: { weekday: 650000, weekend: 800000, currency: "IDR" },
    capacity: { adults: 2, children: 1, maxTotal: 3 },
    size: 32,
    floor: 1,
    bedType: "King Size",
    image: "/images/gallery/standard-heritage.jpg",
    imageAlt: {
      id: "Kamar Deluxe dengan tempat tidur king dan teras taman",
      en: "Deluxe room with king bed and garden terrace"
    },
    amenities: ["AC", "WiFi", "Bathtub", "Teras pribadi", "Minibar", "TV"],
    highlights: [
      { id: "Teras pribadi menghadap taman", en: "Private garden terrace" },
      { id: "Bathtub premium", en: "Premium bathtub" },
      { id: "Minibar lengkap", en: "Fully stocked minibar" }
    ],
    isAvailable: true,
    isSample: true
  },
  {
    id: "room-suite-01",
    slug: "suite",
    type: "suite",
    name: { id: "Svarga Premium Suite", en: "Svarga Premium Suite" },
    shortDescription: {
      id: "Suite paling lengkap dengan ruang keluarga terpisah dan suasana hangat.",
      en: "Our most complete suite with a separate living room and a generous sense of space."
    },
    fullDescription: {
      id: "Svarga Premium Suite adalah puncak kenyamanan kami: ruang keluarga terpisah, kamar tidur luas, dan detail interior hangat yang dirancang untuk tinggal lebih lama. Cocok untuk pasangan yang menginginkan privasi penuh.",
      en: "The Svarga Premium Suite is the pinnacle of our comfort: a separate living room, a spacious bedroom, and warm interior details designed for longer stays. Perfect for couples seeking full privacy."
    },
    price: { weekday: 1200000, weekend: 1500000, currency: "IDR" },
    capacity: { adults: 2, children: 2, maxTotal: 4 },
    size: 48,
    floor: 2,
    bedType: "King Size + Sofa Bed",
    image: "/images/blog/merapi-route.jpg",
    imageAlt: {
      id: "Svarga Premium Suite dengan interior hangat dan ruang tamu",
      en: "Svarga Premium Suite with warm interior and living room"
    },
    amenities: ["AC", "WiFi", "Bathtub", "Ruang keluarga", "Minibar", "Balkon"],
    highlights: [
      { id: "Ruang keluarga terpisah", en: "Separate living room" },
      { id: "Balkon pribadi", en: "Private balcony" },
      { id: "Dekorasi kayu jati", en: "Teak wood details" }
    ],
    isAvailable: true,
    isSample: true
  }
];

export const testimonials: Testimonial[] = [
  {
    id: "testimonial-01",
    guestName: "Ayu Lestari",
    origin: "Jakarta, Indonesia",
    rating: 5,
    initials: "AL",
    roomType: "standard",
    stayMonth: "Maret 2026",
    isHighlighted: true,
    quote: {
      id: "Suasananya tenang, kamarnya bersih, dan keramahan tim membuat kami merasa di rumah.",
      en: "The atmosphere was calm, the room was spotless, and the team made us feel at home."
    },
    isSample: true
  },
  {
    id: "testimonial-02",
    guestName: "Sarah M.",
    origin: "Melbourne, Australia",
    rating: 5,
    initials: "SM",
    roomType: "deluxe",
    stayMonth: "April 2026",
    isHighlighted: true,
    quote: {
      id: "Lokasi yang tepat untuk menikmati sisi Yogyakarta yang lebih pelan dan personal.",
      en: "A beautiful base for experiencing a slower, more personal side of Yogyakarta."
    },
    isSample: true
  },
  {
    id: "testimonial-03",
    guestName: "Budi Santoso",
    origin: "Surabaya, Indonesia",
    rating: 5,
    initials: "BS",
    roomType: "suite",
    stayMonth: "Mei 2026",
    isHighlighted: false,
    quote: {
      id: "Suite-nya sangat luas dan nyaman. Pendopo di pagi hari adalah pengalaman yang tidak terlupakan.",
      en: "The suite was incredibly spacious and comfortable. Morning time at the pendopo was an unforgettable experience."
    },
    isSample: true
  },
  {
    id: "testimonial-04",
    guestName: "Emma & James",
    origin: "London, UK",
    rating: 5,
    initials: "EJ",
    roomType: "deluxe",
    stayMonth: "Juni 2026",
    isHighlighted: false,
    quote: {
      id: "Kami menemukan kedamaian yang tidak terduga di tengah kota. Sarapan paginya luar biasa.",
      en: "We found unexpected peace in the middle of the city. The morning breakfast was outstanding."
    },
    isSample: true
  },
  {
    id: "testimonial-05",
    guestName: "Rina Dewi",
    origin: "Bandung, Indonesia",
    rating: 4,
    initials: "RD",
    roomType: "standard",
    stayMonth: "Juli 2026",
    isHighlighted: false,
    quote: {
      id: "Tempat yang sempurna untuk weekend getaway. Detail Jawa di setiap sudut membuat terasa istimewa.",
      en: "A perfect place for a weekend getaway. The Javanese details in every corner make it feel special."
    },
    isSample: true
  }
];

export const posts: BlogPost[] = [
  {
    slug: "malioboro-pagi",
    title: {
      id: "Malioboro Pagi: Waktu Terbaik Menikmati Kota",
      en: "Malioboro in the Morning: A Better Way to Explore"
    },
    excerpt: {
      id: "Rute singkat untuk menikmati Malioboro sebelum jalan mulai ramai.",
      en: "A simple route for experiencing Malioboro before the streets get busy."
    },
    category: "Wisata Jogja",
    date: "2026-03-10",
    readingTime: 6,
    image: "/images/blog/malioboro-morning.jpg",
    imageAlt: {
      id: "Suasana pagi di Jalan Malioboro Yogyakarta",
      en: "Malioboro street atmosphere in Yogyakarta"
    },
    content: {
      id: "Malioboro adalah jantung Yogyakarta. Di pagi hari, sebelum pedagang kaki lima memenuhi trotoar dan turis berbondong-bondong datang, jalan ini menawarkan sisi yang berbeda — tenang, autentik, dan penuh cerita.\n\nMulailah sekitar pukul 06.00 saat udara masih segar. Dari arah Tugu Jogja, jalanlah ke selatan menyusuri trotoar yang baru dibersihkan. Suasana masih sunyi; hanya beberapa becak yang berjejer rapi dan aroma kopi dari warung yang baru buka. Inilah waktu terbaik untuk melihat arsitektur kolonial yang berbaris di sepanjang jalan tanpa penghalang.\n\nBerhentilah sejenak di Pasar Beringharjo yang mulai hidup. Pedagang membuka lapaknya satu per satu — batik, jajanan pasar, dan oleh-oleh. Jangan ragu menyapa mereka; sebagian besar senang berbagi cerita tentang sejarah pasar yang sudah berdiri sejak abad ke-19.\n\nSebelum jalan kembali ramai sekitar pukul 09.00, singgah di salah satu warung untuk sarapan. Nasi gudeg hangat dengan sambal krecek adalah cara yang tepat mengawali hari di Yogyakarta. Kembalilah ke Svarga sebelum panas terik — perjalanan pagi yang singkat, tapi meninggalkan kesan yang lama.",
      en: "Malioboro is the heart of Yogyakarta. In the early morning, before street vendors fill the sidewalks and tourists arrive in droves, this street offers a different side — calm, authentic, and full of stories.\n\nStart around 06.00 while the air is still fresh. From Tugu Jogja, walk south along the freshly swept sidewalks. The atmosphere is quiet; only a few pedicabs parked in neat rows and the smell of coffee from newly opened stalls. This is the best time to see the colonial architecture lining the street unobstructed.\n\nPause at Pasar Beringharjo as it comes alive. Vendors open their stalls one by one — batik, market snacks, and souvenirs. Do not hesitate to greet them; most enjoy sharing stories about the market that has stood since the 19th century.\n\nBefore the street fills up again around 09.00, stop at a warung for breakfast. Warm gudeg rice with spicy krecek sambal is the right way to start a day in Yogyakarta. Return to Svarga before the heat peaks — a short morning walk that leaves a lasting impression."
    },
    isSample: true
  },
  {
    slug: "rasa-jawa",
    title: {
      id: "Mengenal Rasa Jawa dari Dapur Lokal",
      en: "Finding Java Through Its Local Kitchen"
    },
    excerpt: {
      id: "Dari gudeg hingga jajanan pasar, kenali rasa yang membentuk Yogyakarta.",
      en: "From gudeg to market snacks, discover the flavours that shape Yogyakarta."
    },
    category: "Kuliner",
    date: "2026-02-22",
    readingTime: 5,
    image: "/images/gallery/gudeg-jamu.jpg",
    imageAlt: {
      id: "Hidangan tradisional Indonesia di meja makan",
      en: "Traditional Indonesian dishes on a dining table"
    },
    content: {
      id: "Kuliner Yogyakarta bukan sekadar makanan — ia adalah cerita tentang sejarah, budaya, dan identitas. Setiap hidangan menyimpan filosofi yang telah dijaga turun-temurun.\n\nMulailah dengan gudeg, hidangan ikonik berbahan nangka muda yang dimasak dengan santan dan gula aren. Di Yogyakarta, gudeg disajikan dengan ayam kampung, telur, dan sambal krecek yang pedas. Setiap warung punya resep turun-temurun dengan karakter rasa yang berbeda — menjelajahinya adalah bagian dari kesenangan.\n\nJangan lewatkan jajanan pasar: lupis, klepon, dan getuk yang manisnya pas. Pagi hari, jajanan ini paling segar di pasar tradisional. Siang hari, coba bakpia — oleh-oleh wajib yang isiannya kini berkembang dari kacang hijau klasik hingga cokelat dan keju.\n\nUntuk pengalaman yang lebih dalam, ikuti kelas memasak kecil di sekitar kota. Anda akan belajar meracik bumbu, menumbuk sambal, dan memahami mengapa rasa Jawa selalu seimbang — manis, gurih, dan pedas dalam satu gigitan. Setelah seharian mencicipi, Svarga menawarkan teh hangat dan ketenangan untuk mencerna cerita rasanya.",
      en: "Yogyakarta cuisine is more than food — it is a story of history, culture, and identity. Every dish holds a philosophy passed down through generations.\n\nStart with gudeg, the iconic dish made from young jackfruit cooked slowly with coconut milk and palm sugar. In Yogyakarta, gudeg is served with free-range chicken, eggs, and spicy krecek sambal. Every warung has its own family recipe with a distinct character — exploring them is part of the joy.\n\nDo not miss the market snacks: lupis, klepon, and getuk, all perfectly sweet. In the morning, these are freshest at traditional markets. By midday, try bakpia — the must-have souvenir, now filled with everything from classic mung bean to chocolate and cheese.\n\nFor a deeper experience, join a small cooking class around town. You will learn to blend spices, pound sambal, and understand why Javanese flavour is always balanced — sweet, savoury, and spicy in a single bite. After a day of tasting, Svarga offers warm tea and quiet to digest the story of flavours."
    },
    isSample: true
  },
  {
    slug: "jalan-ke-merapi",
    title: {
      id: "Perjalanan Tenang Menuju Lereng Merapi",
      en: "A Quiet Route Toward Mount Merapi"
    },
    excerpt: {
      id: "Ide perjalanan sehari untuk melihat lanskap Yogyakarta dari sisi lain.",
      en: "An easy day trip for seeing a different landscape around Yogyakarta."
    },
    category: "Tips Perjalanan",
    date: "2026-01-18",
    readingTime: 7,
    image: "/images/rooms/deluxe-room.jpg",
    imageAlt: {
      id: "Lanskap hijau dan pegunungan di sekitar Yogyakarta",
      en: "Green landscape and mountains near Yogyakarta"
    },
    content: {
      id: "Tidak jauh dari pusat kota Yogyakarta, lereng Merapi menawarkan pemandangan yang sama sekali berbeda — hijau, sejuk, dan jauh dari hiruk-pikuk.\n\nRute paling tenang dimulai dari arah Kaliurang. Jalan berkelok melewati perkampungan dan kebun salak yang menghijau. Di ketinggian, udara menjadi lebih segar dan kabut pagi kadang menyapa. Berhentilah di beberapa titik pandang untuk menikmati garis pegunungan yang membentang.\n\nSalah satu pengalaman yang paling berkesan adalah menikmati sarapan di ketinggian, dengan latar puncak Merapi yang kadang muncul di balik awan. Beberapa warung sederhana di sepanjang jalan menyajikan kopi, pisang goreng, dan wedang jahe yang menghangatkan.\n\nUntuk wisatawan yang ingin lebih dekat dengan alam, kawasan lereng menawarkan jalur pendek yang ramah untuk pejalan pemula. Pemandu lokal dengan senang hati berbagi cerita tentang gunung yang disakralkan ini dan kehidupan masyarakat di sekitarnya.\n\nKembalilah ke Svarga sebelum sore — atau jadikan perjalanan ini sebagai persiapan untuk esok hari yang lebih panjang. Lereng Merapi selalu punya cara untuk mengingatkan bahwa Yogyakarta lebih dari sekadar kota.",
      en: "Not far from the city center of Yogyakarta, the slopes of Merapi offer a completely different landscape — green, cool, and far from the hustle.\n\nThe quietest route starts from the Kaliurang direction. The winding road passes villages and green salak orchards. At altitude, the air turns fresher and morning mist sometimes greets you. Stop at several viewpoints to enjoy the mountain ridgeline stretching ahead.\n\nOne of the most memorable experiences is breakfast at altitude, with the peak of Merapi occasionally appearing through the clouds. Simple warungs along the road serve coffee, fried bananas, and warming wedang jahe ginger tea.\n\nFor travellers wanting to get closer to nature, the slopes offer short trails friendly to beginner hikers. Local guides are happy to share stories about this sacred mountain and the lives of the communities around it.\n\nReturn to Svarga before the afternoon — or treat this trip as preparation for a longer day ahead. The slopes of Merapi always have a way of reminding you that Yogyakarta is more than just a city."
    },
    isSample: true
  },
  {
    slug: "candi-borobudur",
    title: {
      id: "Borobudur Saat Matahari Terbit: Ritual Pagi yang Tak Terlupakan",
      en: "Borobudur at Sunrise: A Morning Ritual to Remember"
    },
    excerpt: {
      id: "Panduan lengkap menikmati matahari terbit di Candi Borobudur, dari tiket hingga sudut terbaik.",
      en: "A complete guide to enjoying sunrise at Borobudur Temple, from tickets to the best viewpoints."
    },
    category: "Wisata Jogja",
    date: "2026-04-05",
    readingTime: 8,
    image: "/images/blog/java-kitchen.jpg",
    imageAlt: {
      id: "Candi Borobudur saat matahari terbit dengan kabut tipis",
      en: "Borobudur Temple at sunrise with thin mist"
    },
    content: {
      id: "Candi Borobudur adalah mahakarya dunia yang wajib dilihat setidaknya sekali seumur hidup. Dan tidak ada waktu yang lebih magis selain matahari terbit di sini — ketika kabut tipis menyelimuti stupa dan sinar keemasan mulai menyentuh puncaknya.\n\nTiket sunrise (Manohara Sunrise) harus dipesan minimal satu hari sebelumnya. Harga untuk wisatawan domestik sekitar Rp 375.000 dan untuk mancanegara sekitar Rp 450.000, sudah termasuk sarapan ringan di Manohara Hotel. Bus antar-jemput mulai beroperasi pukul 04.30 dari area parkir.\n\nSesampainya di puncak, cari posisi di sisi timur menghadap Gunung Merapi dan Merbabu. Saat fajar merekah, siluet gunung-gunung itu berpadu dengan barisan stupa — momen yang membuat semua pengorbanan bangun pagi terasa sepadan.\n\nSetelah matahari naik, luangkan waktu untuk berjalan menyusuri relief cerita Buddha yang membentang hampir tiga kilometer. Setiap panel adalah bab dari kehidupan yang penuh makna.\n\nDari Svarga, Borobudur hanya sekitar satu setengah jam berkendara. Berangkatlah pukul 03.30, nikmati momen magis, lalu kembali untuk sarapan kedua di rumah.",
      en: "Borobudur Temple is a world masterpiece that everyone should see at least once in a lifetime. And there is no more magical time than sunrise here — when thin mist wraps the stupas and golden light begins to touch their peaks.\n\nThe sunrise ticket (Manohara Sunrise) must be booked at least a day in advance. Prices are around Rp 375.000 for domestic visitors and Rp 450.000 for internationals, including a light breakfast at Manohara Hotel. Shuttle buses start running at 04.30 from the parking area.\n\nOnce at the top, find a spot on the eastern side facing Mount Merapi and Merbabu. As dawn breaks, the silhouettes of those mountains blend with the rows of stupas — a moment that makes every early wake-up worthwhile.\n\nAfter the sun rises, take time to walk along the Buddha story reliefs that stretch almost three kilometres. Each panel is a chapter of a meaningful life.\n\nFrom Svarga, Borobudur is only about one and a half hours by car. Leave at 03.30, enjoy the magical moment, then return for a second breakfast at home."
    },
    isSample: true
  },
  {
    slug: "prambanan-senja",
    title: {
      id: "Prambanan Senja: Menyaksikan Kemegahan Hindu Jawa",
      en: "Prambanan at Dusk: Witnessing the Grandeur of Javanese Hindu"
    },
    excerpt: {
      id: "Mengapa sore hari adalah waktu terbaik mengunjungi kompleks candi terbesar di Indonesia.",
      en: "Why the late afternoon is the best time to visit Indonesia's largest temple complex."
    },
    category: "Wisata Jogja",
    date: "2026-05-12",
    readingTime: 6,
    image: "/images/gallery/prambanan-sunset.jpg",
    imageAlt: {
      id: "Candi Prambanan dengan langit senja jingga",
      en: "Prambanan Temple with orange dusk sky"
    },
    content: {
      id: "Kompleks Candi Prambanan adalah kompleks candi Hindu terbesar di Indonesia, dan sore hari adalah waktu terbaik untuk menikmatinya. Cahaya senja yang jingga melatari menara-menara candi yang menjulang menciptakan pemandangan yang sulit dilupakan.\n\nBerangkatlah dari Svarga sekitar pukul 15.00 — perjalanan hanya memakan waktu sekitar 25 menit. Dengan begitu, Anda punya waktu untuk menjelajahi tiga candi utama: Candi Shiva Mahadeva setinggi 47 meter, Candi Brahma, dan Candi Vishnu, sebelum cahaya mulai berubah.\n\nRelief Ramayana yang terukir di pagar langkan Candi Shiva adalah salah satu yang paling detail di dunia. Ceritanya mengalir searah jarum jam — ikutilah untuk memahami kisah epiknya.\n\nMenjelang pukul 17.30, posisikan diri di area terbuka barat kompleks. Inilah momen emas: siluet candi membelakangi matahari terbenam, sementara burung-burung kembali ke sarangnya.\n\nJika beruntung, Anda bisa menonton pertunjukan sendratari Ramayana di panggung terbuka saat malam tiba — cara sempurna mengakhiri hari yang sarat budaya.",
      en: "The Prambanan Temple complex is the largest Hindu temple complex in Indonesia, and late afternoon is the best time to enjoy it. The orange dusk light framing the towering temple spires creates an unforgettable sight.\n\nLeave Svarga around 15.00 — the journey takes only about 25 minutes. That gives you time to explore the three main temples: the 47-metre Shiva Mahadeva Temple, Brahma Temple, and Vishnu Temple, before the light begins to shift.\n\nThe Ramayana reliefs carved into the balustrade of Shiva's temple are among the most detailed in the world. The story flows clockwise — follow it to understand the epic tale.\n\nBy around 17.30, position yourself in the western open area of the complex. This is the golden moment: temple silhouettes against the setting sun, while birds return to their nests.\n\nIf you are lucky, you can watch the Ramayana ballet performance at the open-air stage when night falls — a perfect way to end a culturally rich day."
    },
    isSample: true
  },
  {
    slug: "kedai-kopi-jogja",
    title: {
      id: "Kedai Kopi Jogja: Dari Kopi Joss hingga Specialty Brew",
      en: "Yogyakarta Coffee Shops: From Kopi Joss to Specialty Brew"
    },
    excerpt: {
      id: "Jelajahi budaya kopi Yogyakarta, dari arang membara hingga cita rasa modern.",
      en: "Explore Yogyakarta's coffee culture, from glowing charcoal to modern flavours."
    },
    category: "Kuliner",
    date: "2026-06-20",
    readingTime: 5,
    image: "/images/rooms/standard-room.jpg",
    imageAlt: {
      id: "Secangkir kopi hitam di atas meja kayu hangat",
      en: "A cup of black coffee on a warm wooden table"
    },
    content: {
      id: "Yogyakarta dan kopi adalah dua hal yang sulit dipisahkan. Dari warung pinggir jalan yang menyajikan kopi joss dengan arang membara, hingga kedai specialty yang menyeduh biji kopi Jawa dengan presisi, kota ini punya cerita kopi untuk semua orang.\n\nKopi joss adalah ikon Jogja: kopi hitam pekat dengan arang panas yang dicelupkan langsung ke cangkir. Konon arang itu membuat kopi lebih bersih dan tidak bikin mual. Tempat paling legendaris adalah Kopi Joss Pak Haji di dekat perempatan Jalan Malioboro.\n\nJika Anda mencari suasana lebih modern, kawasan Kota Gede dan sekitarnya dipenuhi kedai specialty dengan barista ramah. Banyak dari mereka menyajikan biji kopi lokal dari lereng Merapi dan Merbabu dengan metode pour-over atau espresso.\n\nUntuk pengalaman yang lebih dalam, kunjungi kebun kopi di Kaliurang. Beberapa petani membuka pintu untuk pengunjung — Anda bisa melihat proses dari biji merah hingga secangkir kopi, dan bahkan ikut memetik.\n\nSore hari di Svarga, nikmati secangkir kopi di beranda sambil merencanakan perjalanan kopi Anda berikutnya. Kota ini tidak akan kehabisan cerita untuk diceritakan.",
      en: "Yogyakarta and coffee are two things that are hard to separate. From roadside stalls serving kopi joss with glowing charcoal to specialty shops brewing Javanese beans with precision, this city has a coffee story for everyone.\n\nKopi joss is a Jogja icon: strong black coffee with a hot charcoal dropped straight into the cup. Legend says the charcoal makes the coffee cleaner and gentler on the stomach. The most legendary spot is Kopi Joss Pak Haji near the Malioboro intersection.\n\nIf you are looking for a more modern vibe, the Kota Gede area and its surroundings are full of specialty shops with friendly baristas. Many serve local beans from the slopes of Merapi and Merbabu using pour-over or espresso methods.\n\nFor a deeper experience, visit a coffee plantation in Kaliurang. Some farmers open their doors to visitors — you can see the process from red cherry to a cup of coffee, and even join the picking.\n\nIn the evening at Svarga, enjoy a cup of coffee on the veranda while planning your next coffee journey. This city will never run out of stories to tell."
    },
    isSample: true
  }
];

export const galleryItems: GalleryItem[] = [
  {
    id: "g-1",
    url: "/images/gallery/standard-heritage.jpg",
    title: { id: "Kamar Standard Heritage", en: "Standard Heritage Room" },
    category: "rooms",
    aspectRatio: "landscape",
    caption: {
      id: "Kamar 24 m² dengan tempat tidur king, jendela taman, dan lantai kayu jati",
      en: "24 m² room with a king bed, garden-facing windows, and teak wood floors",
    },
    description: {
      id: "Tempat tidur king berkanopi, kamar mandi dalam dengan shower hujan, dan beranda pribadi yang menghadap taman tropis.",
      en: "A canopied king bed, an en-suite bathroom with a rain shower, and a private veranda overlooking the tropical garden.",
    },
  },
  {
    id: "g-2",
    url: "/images/gallery/deluxe-garden-view.jpg",
    title: { id: "Kamar Deluxe Garden View", en: "Deluxe Garden View Room" },
    category: "rooms",
    aspectRatio: "portrait",
    caption: {
      id: "Kamar 32 m² dengan jendela kaca penuh menghadap taman",
      en: "32 m² room with full-length glazing facing the garden",
    },
    description: {
      id: "Pemandangan taman tropis dari lantai ke langit-langit, sofa duduk rendah, dan meja kerja dari kayu jati.",
      en: "Floor-to-ceiling tropical garden views, a low lounge sofa, and a teak writing desk.",
    },
  },
  {
    id: "g-3",
    url: "/images/gallery/premium-suite.jpg",
    title: { id: "Svarga Premium Suite", en: "Svarga Premium Suite" },
    category: "rooms",
    aspectRatio: "landscape",
    caption: {
      id: "Suite 48 m² dengan ruang tamu terpisah dan bathtub pribadi",
      en: "48 m² suite with a separate living room and private bathtub",
    },
    description: {
      id: "Kamar tidur terpisah dengan ruang tamu, bathtub pijakan kaki, dan langit-langit tinggi berpanel kayu.",
      en: "A separate bedroom with a lounge, a claw-foot bathtub, and a high timber-paneled ceiling.",
    },
  },
  {
    id: "g-4",
    url: "/images/gallery/pendopo-courtyard.jpg",
    title: { id: "Taman Tropis Pendopo", en: "Pendopo Tropical Courtyard" },
    category: "common",
    aspectRatio: "portrait",
    caption: {
      id: "Pendopo terbuka di tengah taman, tempat teh sore",
      en: "Open-air pendopo at the garden centre, built for afternoon tea",
    },
    description: {
      id: "Atap joglo dengan tiang kayu jati, kolam koi, dan kursi rotan di bawah kanopi tropis.",
      en: "A joglo roof on teak pillars, a koi pond, and rattan seating under the tropical canopy.",
    },
  },
  {
    id: "g-5",
    url: "/images/gallery/teak-reception.jpg",
    title: { id: "Lobby Utama Bermotif Ukiran Jati", en: "Teak Sculpted Main Reception" },
    category: "common",
    aspectRatio: "landscape",
    caption: {
      id: "Meja resepsionis dari kayu jati utuh berukir tangan",
      en: "Reception desk carved from a single teak trunk",
    },
    description: {
      id: "Ukiran tangan motif flora Jawa, pencahayaan hangat, dan wangi kayu cendana di lobi.",
      en: "Hand-carved Javanese flora motifs, warm lighting, and a faint sandalwood scent in the lobby.",
    },
  },
  {
    id: "g-6",
    url: "/images/gallery/ceramic-tub.jpg",
    title: { id: "Bathtub Keramik Eksklusif", en: "Exclusive Ceramic Soaking Tub" },
    category: "rooms",
    aspectRatio: "square",
    caption: {
      id: "Bathtub keramik buatan pengrajin lokal",
      en: "Ceramic tub handmade by local artisans",
    },
    description: {
      id: "Dibakar dengan teknik tradisional, diisi air hangat, dengan garam mandi dari rempah lokal.",
      en: "Fired using traditional techniques and filled with warm water and local spice bath salts.",
    },
  },
  {
    id: "g-7",
    url: "/images/gallery/gudeg-jamu.jpg",
    title: { id: "Sarapan Tradisional Gudeg & Jamu", en: "Traditional Gudeg & Herbal Jamu" },
    category: "food",
    aspectRatio: "landscape",
    caption: {
      id: "Sarapan khas Yogyakarta: gudeg manis dan jamu kunyit asam",
      en: "Yogyakarta staple breakfast: sweet gudeg and turmeric-tamarind jamu",
    },
    description: {
      id: "Disajikan di pendopo setiap pagi, dengan nasi gurih, ayam kampung, dan sambal krecek.",
      en: "Served at the pendopo each morning with fragrant rice, free-range chicken, and spicy krecek sambal.",
    },
  },
  {
    id: "g-8",
    url: "/images/gallery/malioboro-evening.jpg",
    title: { id: "Suasana Sore Malioboro", en: "Malioboro Evening Atmosphere" },
    category: "around",
    aspectRatio: "landscape",
    caption: {
      id: "Jalan Malioboro saat sore, 10 menit dari Svarga",
      en: "Malioboro at dusk, a 10-minute walk from Svarga",
    },
    description: {
      id: "Andong dan lampu jalan, warung lesehan, dan keramaian khas jantung kota Yogyakarta.",
      en: "Horse-drawn andong, street lamps, lesehan food stalls, and the hum of Yogyakarta's heart.",
    },
  },
  {
    id: "g-9",
    url: "/images/gallery/prambanan-sunset.jpg",
    title: { id: "Candi Prambanan Saat Sunset", en: "Prambanan Temple at Sunset" },
    category: "around",
    aspectRatio: "portrait",
    caption: {
      id: "Candi Prambanan berusia 1.200 tahun saat matahari terbenam",
      en: "The 1,200-year-old Prambanan temple at golden hour",
    },
    description: {
      id: "Situs warisan dunia UNESCO, 17 km dari Svarga, dengan latar Gunung Merapi.",
      en: "A UNESCO World Heritage site 17 km from Svarga, framed by Mount Merapi.",
    },
  },
];
