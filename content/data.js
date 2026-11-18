/* =====================================================================
   VBROS DATA FILE  —  the ONE place for all products, drops, polls & texts
   (Season 01 · Monsoon  —  "Loot from two worlds")
   =====================================================================

   Hey bro 👋  This file is the brain of the website.
   Change something here, save, refresh the page — done.

   HOW THIS FILE WORKS
   -------------------
   • Everything lives inside  window.VBRO_DATA = { ... };
     (yes, the code name is still VBRO_DATA without the S — don't rename
      it, the website looks for exactly that name. The BRAND is VBros.)
   • It has 6 sections:  meta, founders, products, drops, polls, ui
   • Almost every text exists 3 times:  { en: "...", nl: "...", vi: "..." }
       en = English (default), nl = Dutch, vi = Vietnamese
     ALWAYS fill in all three. If you don't know one yet, copy the
     English text in there for now — better than leaving it empty.

   GOLDEN RULES (so the site doesn't break)
   ----------------------------------------
   1. Text goes between "double quotes". Need a quote inside? Use ’ or \"
   2. Every item in a list ends with a comma  ,   (the last one may too)
   3. Every {  needs a matching  }   and every [  a matching  ]
   4. Dates look like  "2026-12-01"  (year-month-day)
      Times look like  "2026-11-17T18:30:00+01:00"
        +01:00 = Amsterdam winter time,  +07:00 = Sài Gòn time
   5. Numbers (prices, votes, spots) have NO quotes:  12.5  not  "12.5"
      Use a dot for decimals: 4.95 (not 4,95)
   6. NO real brand names, logos or famous characters. Invent names!
   7. NO surnames, ages, photos or school names of the bros. Ever.
   8. NO names of real games or game characters either. We sound like a
      game, we don't copy one.

   GAME WORDS WE USE (so everyone writes the same thing)
   -----------------------------------------------------
   products = "loot"        cart = "Loadout"      add to cart = "Lock in"
   polls = "Squad vote"     founders = "The squad"    feed = "Drops"
   BUT: checkout, payment, legal, contact and the "ask a parent to pay"
   text stay in normal, plain words. Money stuff must be crystal clear.

   After editing, a grown-up (or you!) can test the file with:
     node -e "require('vm').runInNewContext(require('fs').readFileSync('content/data.js','utf8'),{window:{}})"
   No output = all good. An error message = look at the line it mentions.
   ===================================================================== */

window.VBRO_DATA = {

  /* -------------------------------------------------------------------
     META — general settings
     ------------------------------------------------------------------- */
  meta: {
    defaultLang: "en",          // "en", "nl" or "vi"
    languages: ["en", "nl", "vi"],
    currency: "EUR",
    // Rough exchange rate we use to calculate priceVND.
    // 1 EUR ≈ 28,000 VND → multiply EUR by 28000 and round to a nice number.
    eurToVnd: 28000,
    lastUpdated: "2026-11-18"
  },


  /* -------------------------------------------------------------------
     FOUNDERS — the three bros
     -------------------------------------------------------------------
     • id      : short code, lowercase, no spaces. Products & drops use it
                 in "spottedBy" / "author" to say who found / posted it.
     • name    : FIRST NAME ONLY. Plain text ("Duy"), or 3 languages
                 when the Vietnamese spelling differs:
                 { en: "Dan", nl: "Dan", vi: "Đan" }
     • city    : where they live
     • flag    : "NL" or "VN"
     • handle  : their social handle
     • avatar  : no photos! the site draws an illustrated avatar from this
                 { emoji, bg }  (bg = colour word the site understands:
                 mint, lime, pink, sky, sun, peach, lilac, sand, coral, ink)
     • squadRole : their game role, 1–2 words, 3 languages.
                 The site shows it as  "Duy · Scout".
     • role    : one short line about their vibe, in 3 languages
     ------------------------------------------------------------------- */
  founders: [
    // ↓↓↓ EXAMPLE — copy this block to add a new founder ↓↓↓
    {
      id: "duy",
      name: "Duy",
      city: "Amsterdam",
      flag: "NL",
      handle: "@duy.ams",
      avatar: { emoji: "🍜", bg: "peach" },
      squadRole: { en: "Scout", nl: "Scout", vi: "Trinh sát" },
      role: {
        en: "Snack scout. Has tasted every chili flavour so you don't have to.",
        nl: "Snack-scout. Heeft elke chilismaak al geproefd, zodat jij dat niet hoeft.",
        vi: "Trùm săn snack. Đã thử hết mọi vị cay, để bạn khỏi phải liều."
      }
    },
    // ↑↑↑ end of example ↑↑↑
    {
      id: "dan",
      name: { en: "Dan", nl: "Dan", vi: "Đan" },
      city: "Amsterdam",
      flag: "NL",
      handle: "@dan.ams",
      avatar: { emoji: "🃏", bg: "lime" },
      squadRole: { en: "Tactician", nl: "Strateeg", vi: "Quân sư" },
      role: {
        en: "Card-game nerd & cube timer. Will explain the rules. Twice.",
        nl: "Kaartspel-nerd en cube-fanaat. Legt de regels uit. Twee keer.",
        vi: "Mọt game bài kiêm dân chơi cube. Giải thích luật hai lần mới chịu."
      }
    },
    {
      id: "tung",
      name: { en: "Tung", nl: "Tung", vi: "Tùng" },
      city: "Sài Gòn",
      flag: "VN",
      handle: "@tung.sgn",
      avatar: { emoji: "🛵", bg: "mint" },
      squadRole: { en: "Runner", nl: "Runner", vi: "Shipper" },
      role: {
        en: "Saigon street-finds. Knows which alley has the good stuff.",
        nl: "Straatvondsten uit Saigon. Weet in welk steegje de goeie spullen liggen.",
        vi: "Chuyên săn đồ hay ngoài phố Sài Gòn. Hẻm nào có hàng xịn là biết liền."
      }
    }
  ],


  /* -------------------------------------------------------------------
     PRODUCTS — everything people can pre-order
     -------------------------------------------------------------------
     • id             : unique code, lowercase-with-dashes (never reuse one!)
     • name           : product name in 3 languages
     • category       : ONE of these exact words:
                        "card-games", "snacks", "stationery", "phone",
                        "collectibles", "tshirts", "cubes", "bags"
     • origin         : where WE BUY it
                        "VN" = bought in Vietnam, ships to NL/EU
                        "NL" = bought in the Netherlands, ships to VN
     • priceEUR       : price in euros (number, e.g. 12 or 12.5)
     • priceVND       : same price in đồng, just for reference
                        (priceEUR × 28000, rounded to a nice number)
     • preorderCloses : last day to pre-order, "YYYY-MM-DD"
     • spots          : { taken: how many are pre-ordered,
                          total: how many we can bring this batch }
     • status         : ONE of:
                        "open"     = pre-order open
                        "almost"   = almost full (use when ~80%+ taken)
                        "shipping" = batch is full & on its way to you
                        "soldout"  = gone, no more this batch
     • spottedBy      : founder id ("duy", "dan" or "tung")
     • rarity         : ONE of these exact words (the site gives each a
                        coloured frame + label, like loot in a game):
                        "common"    = easy to bring over, big batches,
                                      you'll probably see it again
                        "rare"      = hard to find on the other side,
                                      or a smaller batch
                        "epic"      = handmade / small workshop / few spots,
                                      not sure there's a next batch
                        "legendary" = super limited or a one-off find.
                                      Max 1–2 at a time, or it's not special!
                        Rarity is about how hard it is to GET, not about
                        the price. Rough mix: most common/rare, 3 epic,
                        1–2 legendary.
     • visual         : { emoji, bg } — we have no photos, so the site
                        shows a big emoji on a coloured card.
                        bg = mint, lime, pink, sky, sun, peach, lilac,
                             sand, coral, ink
     • hype           : one punchy line (3 languages)
     • description    : 2 short sentences (3 languages)
     ------------------------------------------------------------------- */
  products: [
    // ↓↓↓ EXAMPLE — copy this whole block (from { to },) to add a product ↓↓↓
    {
      id: "street-food-showdown",
      name: {
        en: "Street Food Showdown",
        nl: "Street Food Showdown",
        vi: "Đại Chiến Ăn Vặt"
      },
      category: "card-games",
      origin: "VN",
      priceEUR: 12,
      priceVND: 340000,
      preorderCloses: "2026-12-05",
      spots: { taken: 18, total: 40 },
      status: "open",
      spottedBy: "tung",
      rarity: "rare",
      visual: { emoji: "🥢", bg: "coral" },
      hype: {
        en: "Fast card game. Loud table. Zero chill.",
        nl: "Snel kaartspel. Luide tafel. Nul chill.",
        vi: "Game bài nhanh, bàn ồn, không ai chill nổi."
      },
      description: {
        en: "Build the best street-food stall before your friends steal your ingredients. Rounds take 10 minutes, so it's always 'one more game'.",
        nl: "Bouw de beste streetfoodkraam voordat je vrienden je ingrediënten jatten. Een potje duurt 10 minuten, dus het is altijd 'nog eentje dan'.",
        vi: "Dựng xe ăn vặt xịn nhất trước khi tụi bạn chôm hết nguyên liệu. Mỗi ván 10 phút nên lúc nào cũng 'thêm ván nữa thôi'."
      }
    },
    // ↑↑↑ end of example ↑↑↑

    {
      id: "bike-chaos",
      name: {
        en: "Bike Chaos",
        nl: "Fietschaos",
        vi: "Loạn Xe Đạp"
      },
      category: "card-games",
      origin: "NL",
      priceEUR: 15,
      priceVND: 420000,
      preorderCloses: "2026-12-12",
      spots: { taken: 9, total: 30 },
      status: "open",
      spottedBy: "dan",
      rarity: "common",
      visual: { emoji: "🚲", bg: "sky" },
      hype: {
        en: "Amsterdam traffic, but as a card game. Somehow more fun.",
        nl: "Amsterdams verkeer, maar dan als kaartspel. Op een of andere manier leuker.",
        vi: "Giao thông Amsterdam nhưng thành game bài. Vậy mà vui hơn."
      },
      description: {
        en: "Race across the city on the busiest bike lanes and block your friends at every bridge. Works with 2 to 6 players.",
        nl: "Race door de stad over de drukste fietspaden en blokkeer je vrienden bij elke brug. Te spelen met 2 tot 6 man.",
        vi: "Đua xe đạp qua những làn đường đông nhất thành phố, chặn bạn bè ở mỗi cây cầu. Chơi được từ 2 đến 6 người."
      }
    },

    {
      id: "chili-mango-strips",
      name: {
        en: "Chili Mango Strips",
        nl: "Chili-mangoreepjes",
        vi: "Xoài Sấy Muối Ớt"
      },
      category: "snacks",
      origin: "VN",
      priceEUR: 6,
      priceVND: 170000,
      preorderCloses: "2026-11-28",
      spots: { taken: 46, total: 50 },
      status: "almost",
      spottedBy: "duy",
      rarity: "rare",
      visual: { emoji: "🥭", bg: "sun" },
      hype: {
        en: "Sweet, sour, spicy. Your mouth won't know what hit it.",
        nl: "Zoet, zuur, pittig. Je mond weet niet wat 'm overkomt.",
        vi: "Chua, ngọt, cay đủ vị. Ăn một miếng là ghiền."
      },
      description: {
        en: "Chewy dried mango rolled in chili salt, straight from a family stall in Sài Gòn. One bag is 200 g, which is not enough, trust us.",
        nl: "Taaie gedroogde mango met chilizout, rechtstreeks van een familiekraam in Sài Gòn. Een zak is 200 gram, en dat is te weinig, geloof ons.",
        vi: "Xoài sấy dẻo lăn muối ớt, lấy thẳng từ sạp nhà làm ở Sài Gòn. Một bịch 200 g, mà nói thật là không đủ đâu."
      }
    },

    {
      id: "caramel-waffle-tin",
      name: {
        en: "Mini Caramel Waffle Tin",
        nl: "Blik mini-karamelwafels",
        vi: "Hộp Bánh Quế Caramel Mini"
      },
      category: "snacks",
      origin: "NL",
      priceEUR: 8,
      priceVND: 225000,
      preorderCloses: "2026-12-10",
      spots: { taken: 22, total: 60 },
      status: "open",
      spottedBy: "duy",
      rarity: "common",
      visual: { emoji: "🧇", bg: "sand" },
      hype: {
        en: "Put one on your hot drink. Wait 30 seconds. Thank us later.",
        nl: "Leg 'm op je warme drankje. Wacht 30 seconden. Je bedankt ons later wel.",
        vi: "Đặt một cái lên ly nóng, đợi 30 giây. Cảm ơn tụi mình sau nha."
      },
      description: {
        en: "Thin Dutch waffle cookies with a gooey caramel layer, in a tin that's too cute to throw away. Classic NL snack, now going to Sài Gòn.",
        nl: "Dunne wafels met een kleverig laagje karamel, in een blik dat te leuk is om weg te gooien. Echte Hollandse klassieker, nu op weg naar Sài Gòn.",
        vi: "Bánh quế mỏng kiểu Hà Lan, kẹp lớp caramel dẻo, đựng trong hộp thiếc dễ thương không nỡ vứt. Món kinh điển của Hà Lan, giờ bay về Sài Gòn."
      }
    },

    {
      id: "night-market-gel-pens",
      name: {
        en: "Night Market Gel Pens (6-pack)",
        nl: "Night Market gelpennen (6 stuks)",
        vi: "Bút Gel Chợ Đêm (bộ 6 cây)"
      },
      category: "stationery",
      origin: "VN",
      priceEUR: 7,
      priceVND: 195000,
      preorderCloses: "2026-12-03",
      spots: { taken: 31, total: 80 },
      status: "open",
      spottedBy: "tung",
      rarity: "rare",
      visual: { emoji: "🖊️", bg: "lilac" },
      hype: {
        en: "Neon ink that pops on black paper. Notes, but make them glow.",
        nl: "Neoninkt die knalt op zwart papier. Aantekeningen, maar dan met glow.",
        vi: "Mực neon nổi bần bật trên giấy đen. Ghi bài mà như phát sáng."
      },
      description: {
        en: "Six smooth gel pens in night-market neon colours. Super popular with students in Sài Gòn and hard to find in the EU.",
        nl: "Zes soepel schrijvende gelpennen in neonkleuren, zoals een avondmarkt. Megapopulair bij scholieren in Sài Gòn en lastig te vinden in de EU.",
        vi: "Sáu cây bút gel viết êm, màu neon như chợ đêm. Học sinh Sài Gòn mê lắm, mà bên châu Âu khó kiếm."
      }
    },

    {
      id: "canal-grid-notebook",
      name: {
        en: "Canal Grid Notebook A5",
        nl: "Grachten-notitieboek A5",
        vi: "Sổ Dot Grid Kênh Đào A5"
      },
      category: "stationery",
      origin: "NL",
      priceEUR: 9,
      priceVND: 250000,
      preorderCloses: "2026-12-18",
      spots: { taken: 12, total: 40 },
      status: "open",
      spottedBy: "dan",
      rarity: "common",
      visual: { emoji: "📓", bg: "mint" },
      hype: {
        en: "Dot-grid pages, canal-house cover. Journal glow-up.",
        nl: "Puntjespapier, grachtenpandje op de kaft. Je journal, maar dan beter.",
        vi: "Giấy dot grid, bìa nhà kênh đào. Sổ journal lên đời."
      },
      description: {
        en: "A5 notebook with 160 dot-grid pages and a cover printed with crooked Amsterdam houses. Lies flat, so drawing is easy.",
        nl: "A5-notitieboek met 160 pagina's puntjespapier en een kaft met scheve Amsterdamse huisjes. Ligt helemaal plat, dus tekenen gaat makkelijk.",
        vi: "Sổ A5 160 trang dot grid, bìa in mấy ngôi nhà nghiêng nghiêng ở Amsterdam. Mở ra nằm phẳng nên vẽ rất sướng."
      }
    },

    {
      id: "beaded-phone-strap",
      name: {
        en: "Beaded Phone Strap",
        nl: "Kralen-telefoonkoord",
        vi: "Dây Đeo Điện Thoại Hạt Cườm"
      },
      category: "phone",
      origin: "VN",
      priceEUR: 5,
      priceVND: 140000,
      preorderCloses: "2026-11-27",
      spots: { taken: 60, total: 60 },
      status: "shipping",
      spottedBy: "tung",
      rarity: "epic",
      visual: { emoji: "📿", bg: "pink" },
      hype: {
        en: "Handmade in Sài Gòn. Your phone deserves accessories too.",
        nl: "Handgemaakt in Sài Gòn. Je telefoon verdient ook wat bling.",
        vi: "Handmade ở Sài Gòn. Điện thoại cũng cần phụ kiện chứ."
      },
      description: {
        en: "Short wrist strap with colourful beads that clips onto almost any case. Every one is a bit different because they're made by hand.",
        nl: "Kort polskoord met kleurige kralen dat aan bijna elk hoesje past. Elk koord is net anders, want ze zijn met de hand gemaakt.",
        vi: "Dây đeo tay ngắn với hạt cườm nhiều màu, gắn được vào hầu hết ốp điện thoại. Làm tay nên mỗi sợi một kiểu, không đụng hàng."
      }
    },

    {
      id: "rooftop-cats-blind-box",
      name: {
        en: "Rooftop Cats Blind Box",
        nl: "Rooftop Cats blind box",
        vi: "Hộp Mù Mèo Sân Thượng"
      },
      category: "collectibles",
      origin: "VN",
      priceEUR: 11,
      priceVND: 310000,
      preorderCloses: "2026-12-08",
      spots: { taken: 44, total: 50 },
      status: "almost",
      spottedBy: "tung",
      rarity: "legendary",
      visual: { emoji: "🐈", bg: "lilac" },
      hype: {
        en: "8 cats, 1 secret gold one. Feeling lucky?",
        nl: "8 katten, 1 geheime gouden. Voel jij je lucky?",
        vi: "8 bé mèo, 1 bé ẩn màu vàng. Hên xui nha!"
      },
      description: {
        en: "Tiny vinyl cats chilling on Saigon rooftops, by a small local designer. You don't know which one's inside until you open it.",
        nl: "Mini vinyl katjes die chillen op daken in Saigon, ontworpen door een kleine lokale designer. Je weet pas welke je hebt als je 'm openmaakt.",
        vi: "Mấy bé mèo vinyl tí hon nằm chill trên sân thượng Sài Gòn, do một designer local nhỏ làm. Phải mở hộp mới biết mình trúng bé nào."
      }
    },

    {
      id: "canal-house-pin-set",
      name: {
        en: "Canal House Pin Set",
        nl: "Grachtenpanden pinset",
        vi: "Bộ Pin Cài Nhà Kênh Đào"
      },
      category: "collectibles",
      origin: "NL",
      priceEUR: 10,
      priceVND: 280000,
      preorderCloses: "2026-12-15",
      spots: { taken: 14, total: 35 },
      status: "open",
      spottedBy: "dan",
      rarity: "rare",
      visual: { emoji: "🏠", bg: "coral" },
      hype: {
        en: "Four tiny houses. One very aesthetic backpack.",
        nl: "Vier mini huisjes. Eén hele aesthetic rugzak.",
        vi: "Bốn ngôi nhà tí hon, một chiếc balo cực aesthetic."
      },
      description: {
        en: "Set of four enamel pins shaped like Amsterdam canal houses, each in a different colour. Pin them on your bag, jacket or cap.",
        nl: "Set van vier emaille pins in de vorm van Amsterdamse grachtenpanden, elk in een andere kleur. Op je tas, jas of pet, wat jij wil.",
        vi: "Bộ bốn pin cài men hình nhà kênh đào Amsterdam, mỗi cái một màu. Cài lên balo, áo khoác hay nón đều xinh."
      }
    },

    {
      id: "two-cities-tee",
      name: {
        en: "Two Cities Tee",
        nl: "Two Cities T-shirt",
        vi: "Áo Thun Hai Thành Phố"
      },
      category: "tshirts",
      origin: "VN",
      priceEUR: 24,
      priceVND: 670000,
      preorderCloses: "2026-12-20",
      spots: { taken: 25, total: 40 },
      status: "open",
      spottedBy: "duy",
      rarity: "epic",
      visual: { emoji: "👕", bg: "ink" },
      hype: {
        en: "AMS ⇄ SGN on your chest. 9,800 km of drip.",
        nl: "AMS ⇄ SGN op je borst. 9.800 km drip.",
        vi: "AMS ⇄ SGN trên ngực áo. 9.800 cây số chất lừ."
      },
      description: {
        en: "Heavy cotton oversized tee, screen-printed in a small workshop in Sài Gòn. Sizes S to XL, washed black or off-white.",
        nl: "Oversized shirt van dik katoen, gezeefdrukt in een klein atelier in Sài Gòn. Maten S t/m XL, in washed black of off-white.",
        vi: "Áo thun form rộng, cotton dày, in lụa ở một xưởng nhỏ tại Sài Gòn. Size S đến XL, màu đen wash hoặc trắng ngà."
      }
    },

    {
      id: "polder-speed-cube",
      name: {
        en: "Polder 3×3 Speed Cube",
        nl: "Polder 3×3 speedcube",
        vi: "Speedcube Polder 3×3"
      },
      category: "cubes",
      origin: "NL",
      priceEUR: 18,
      priceVND: 505000,
      preorderCloses: "2026-11-30",
      spots: { taken: 20, total: 20 },
      status: "soldout",
      spottedBy: "dan",
      rarity: "legendary",
      visual: { emoji: "🧊", bg: "sky" },
      hype: {
        en: "Magnetic, smooth, stupid fast. Dan's personal best dropped 4 seconds.",
        nl: "Magnetisch, soepel, belachelijk snel. Dan z'n PB ging 4 seconden omlaag.",
        vi: "Có nam châm, xoay mượt, nhanh khó tin. Đan phá luôn kỷ lục cá nhân, nhanh hơn 4 giây."
      },
      description: {
        en: "Magnetic 3×3 speed cube with adjustable tension, made by a small Dutch cube shop. Stickerless, so no peeling ever.",
        nl: "Magnetische 3×3 speedcube met instelbare spanning, van een kleine Nederlandse cube-shop. Zonder stickers, dus er laat nooit iets los.",
        vi: "Cube 3×3 nam châm, chỉnh được độ căng, của một shop cube nhỏ bên Hà Lan. Không dán sticker nên khỏi lo bong tróc."
      }
    },

    {
      id: "monsoon-backpack",
      name: {
        en: "Monsoon Backpack",
        nl: "Monsoon rugzak",
        vi: "Balo Mùa Mưa"
      },
      category: "bags",
      origin: "VN",
      priceEUR: 42,
      priceVND: 1180000,
      preorderCloses: "2026-12-31",
      spots: { taken: 7, total: 25 },
      status: "open",
      spottedBy: "tung",
      rarity: "epic",
      visual: { emoji: "🎒", bg: "lime" },
      hype: {
        en: "Built for Saigon rain. Dutch rain doesn't stand a chance.",
        nl: "Gemaakt voor de regen in Saigon. Hollandse regen maakt geen kans.",
        vi: "Sinh ra cho mưa Sài Gòn. Mưa Hà Lan nhằm nhò gì."
      },
      description: {
        en: "Waterproof school backpack with a padded laptop pocket and a hidden zip on the back. Made in Vietnam, fits a 15-inch laptop.",
        nl: "Waterdichte schooltas met een gevoerd laptopvak en een verborgen rits aan de achterkant. Gemaakt in Vietnam, er past een 15-inch laptop in.",
        vi: "Balo đi học chống nước, có ngăn laptop lót đệm và khóa kéo giấu sau lưng. Sản xuất tại Việt Nam, vừa laptop 15 inch."
      }
    }
  ],


  /* -------------------------------------------------------------------
     DROPS — the feed: short posts by the bros
     -------------------------------------------------------------------
     Newest at the TOP please (the site sorts by time anyway).
     • id        : unique code, e.g. "d9", "d10"...
     • author    : founder id ("duy", "dan", "tung")
     • city      : where the post is from
     • flag      : "NL" or "VN"
     • timestamp : "YYYY-MM-DDTHH:MM:00+01:00"  (Amsterdam)
                   "YYYY-MM-DDTHH:MM:00+07:00"  (Sài Gòn)
     • tag       : ONE of: "just-landed", "spotted", "restock",
                   "shipping", "last-call", "poll"
                   (the labels for these are in ui.dropTags below)
     • productId : OPTIONAL — the id of a product to link to.
                   No product? Write  productId: null
     • text      : the post itself, 3 languages. Short! Emojis ok.
     ------------------------------------------------------------------- */
  drops: [
    // ↓↓↓ EXAMPLE — copy this block to add a new drop (put it at the top) ↓↓↓
    {
      id: "d8",
      author: "tung",
      city: "Sài Gòn",
      flag: "VN",
      timestamp: "2026-11-18T13:40:00+07:00",
      tag: "spotted",
      productId: "monsoon-backpack",
      text: {
        en: "Got caught in a full monsoon downpour with this bag. Laptop: totally dry. Pre-orders open now 🎒💧",
        nl: "Kwam met deze tas in een enorme tropische stortbui terecht. Laptop: kurkdroog. Pre-orders staan open 🎒💧",
        vi: "Dính nguyên trận mưa xối xả với cái balo này. Laptop: khô ran. Mở đặt trước rồi nha 🎒💧"
      }
    },
    // ↑↑↑ end of example ↑↑↑
    {
      id: "d7",
      author: "dan",
      city: "Amsterdam",
      flag: "NL",
      timestamp: "2026-11-17T16:15:00+01:00",
      tag: "last-call",
      productId: "polder-speed-cube",
      text: {
        en: "Polder cubes: all 20 gone in 3 days. GG. Missed it? Hit the squad vote if you want a second batch 🧊",
        nl: "Polder-cubes: alle 20 weg in 3 dagen. GG. Gemist? Stem in de squad vote als je een tweede batch wil 🧊",
        vi: "Cube Polder: 20 cái bay sạch trong 3 ngày. GG. Ai lỡ thì vào vote nếu muốn tụi mình nhập đợt hai nha 🧊"
      }
    },
    {
      id: "d6",
      author: "duy",
      city: "Amsterdam",
      flag: "NL",
      timestamp: "2026-11-16T12:05:00+01:00",
      tag: "last-call",
      productId: "chili-mango-strips",
      text: {
        en: "Only 4 spots left for chili mango. Closing soon. My desk drawer is already empty 🥭🌶️",
        nl: "Nog maar 4 plekken voor de chili-mango. Sluit binnenkort. Mijn bureaula is al leeg 🥭🌶️",
        vi: "Xoài sấy muối ớt chỉ còn 4 suất. Sắp chốt rồi. Hộc bàn của mình hết sạch rồi 🥭🌶️"
      }
    },
    {
      id: "d5",
      author: "tung",
      city: "Sài Gòn",
      flag: "VN",
      timestamp: "2026-11-15T10:30:00+07:00",
      tag: "shipping",
      productId: "beaded-phone-strap",
      text: {
        en: "60 phone straps packed and at the post office. See you in Amsterdam in about two weeks 📦✈️",
        nl: "60 telefoonkoordjes ingepakt en bij het postkantoor. Over een week of twee in Amsterdam 📦✈️",
        vi: "60 dây đeo điện thoại đã gói xong, gửi bưu điện rồi. Khoảng hai tuần nữa gặp nhau ở Amsterdam 📦✈️"
      }
    },
    {
      id: "d4",
      author: "dan",
      city: "Amsterdam",
      flag: "NL",
      timestamp: "2026-11-14T20:45:00+01:00",
      tag: "spotted",
      productId: "bike-chaos",
      text: {
        en: "Played Bike Chaos with 5 people tonight. Two friendships ended at the bridge card. 10/10 🚲",
        nl: "Vanavond Fietschaos gespeeld met z'n vijven. Twee vriendschappen gesneuveld bij de brugkaart. 10/10 🚲",
        vi: "Tối nay chơi Loạn Xe Đạp với 5 đứa. Hai tình bạn tan vỡ ở lá bài cây cầu. 10/10 🚲"
      }
    },
    {
      id: "d3",
      author: "tung",
      city: "Sài Gòn",
      flag: "VN",
      timestamp: "2026-11-12T21:10:00+07:00",
      tag: "just-landed",
      productId: "caramel-waffle-tin",
      text: {
        en: "The caramel waffle tins Duy sent just landed in Sài Gòn 🔥 Tried one on my iced coffee. Different, but it works.",
        nl: "De karamelwafelblikken van Duy zijn net geland in Sài Gòn 🔥 Eentje op mijn ijskoffie gelegd. Apart, maar het werkt.",
        vi: "Hộp bánh quế caramel Duy gửi vừa đáp Sài Gòn 🔥 Thử đặt lên ly cà phê đá. Lạ lạ mà hợp ghê."
      }
    },
    {
      id: "d2",
      author: "duy",
      city: "Amsterdam",
      flag: "NL",
      timestamp: "2026-11-10T17:20:00+01:00",
      tag: "restock",
      productId: "street-food-showdown",
      text: {
        en: "Street Food Showdown is back! Batch 2 is open, 40 spots this time 🥢",
        nl: "Street Food Showdown is terug! Batch 2 staat open, deze keer 40 plekken 🥢",
        vi: "Đại Chiến Ăn Vặt quay lại rồi! Mở đặt trước đợt 2, lần này có 40 suất 🥢"
      }
    },
    {
      id: "d1",
      author: "tung",
      city: "Sài Gòn",
      flag: "VN",
      timestamp: "2026-11-08T15:00:00+07:00",
      tag: "spotted",
      productId: "rooftop-cats-blind-box",
      text: {
        en: "Found a tiny shop in District 3 making blind-box cats. The secret one is gold 👀",
        nl: "Een piepklein winkeltje gevonden in District 3 dat blind-box katjes maakt. De geheime is goud 👀",
        vi: "Mới tìm ra một tiệm nhỏ xíu ở Quận 3 làm hộp mù mèo. Bé ẩn màu vàng luôn 👀"
      }
    }
  ],


  /* -------------------------------------------------------------------
     POLLS — "what should we bring next?"
     -------------------------------------------------------------------
     • id       : unique code, e.g. "poll3"
     • active   : true = people can vote, false = show results only
     • question : 3 languages
     • options  : list of choices. Each one has:
                    id    : unique within this poll (e.g. "a", "b", "c")
                    emoji : one emoji
                    votes : starting number of votes (a number)
                    label : 3 languages
     Tip: 3 or 4 options works best on a phone screen.
     ------------------------------------------------------------------- */
  polls: [
    // ↓↓↓ EXAMPLE — copy this block to add a new poll ↓↓↓
    {
      id: "poll1",
      active: true,
      direction: "VN→NL",
      question: {
        en: "What should Tung bring from Sài Gòn next?",
        nl: "Wat moet Tung als volgende uit Sài Gòn meenemen?",
        vi: "Đợt tới Tùng nên mang gì từ Sài Gòn qua?"
      },
      options: [
        {
          id: "a",
          emoji: "☕",
          votes: 41,
          label: {
            en: "Drip-filter coffee kit",
            nl: "Vietnamese koffiefilter-set",
            vi: "Bộ phin pha cà phê"
          }
        },
        {
          id: "b",
          emoji: "🏮",
          votes: 27,
          label: {
            en: "Mini silk lantern lamp",
            nl: "Mini zijden lampionlamp",
            vi: "Đèn lồng lụa mini"
          }
        },
        {
          id: "c",
          emoji: "🍘",
          votes: 58,
          label: {
            en: "Rice-paper snack box",
            nl: "Snackbox met rijstpapier-chips",
            vi: "Hộp bánh tráng ăn vặt"
          }
        },
        {
          id: "d",
          emoji: "🧢",
          votes: 19,
          label: {
            en: "Embroidered bucket hat",
            nl: "Geborduurde bucket hat",
            vi: "Nón bucket thêu tay"
          }
        }
      ]
    },
    // ↑↑↑ end of example ↑↑↑
    {
      id: "poll2",
      active: true,
      direction: "NL→VN",
      question: {
        en: "What should Duy & Dan send to Sài Gòn next?",
        nl: "Wat moeten Duy en Dan als volgende naar Sài Gòn sturen?",
        vi: "Duy với Đan nên gửi gì về Sài Gòn tiếp?"
      },
      options: [
        {
          id: "a",
          emoji: "💡",
          votes: 22,
          label: {
            en: "Glow-in-the-dark bike lights",
            nl: "Fietslampjes die oplichten in het donker",
            vi: "Đèn xe đạp dạ quang"
          }
        },
        {
          id: "b",
          emoji: "🍬",
          votes: 35,
          label: {
            en: "Dutch licorice mix (brave people only)",
            nl: "Dropmix (alleen voor dappere mensen)",
            vi: "Kẹo cam thảo Hà Lan (dành cho người gan dạ)"
          }
        },
        {
          id: "c",
          emoji: "🌷",
          votes: 30,
          label: {
            en: "Tulip grow-your-own kit",
            nl: "Kweekset voor je eigen tulpen",
            vi: "Bộ tự trồng hoa tulip"
          }
        },
        {
          id: "d",
          emoji: "✨",
          votes: 16,
          label: {
            en: "Pixel-art sticker sheets",
            nl: "Pixel-art stickervellen",
            vi: "Tấm sticker pixel-art"
          }
        }
      ]
    }
  ],



  /* -------------------------------------------------------------------
     UI — every text on the website buttons, menus, checkout, footer...
     -------------------------------------------------------------------
     You usually only change wording here, not the structure.
     Words in {curly brackets} are filled in by the site automatically —
     keep them exactly as they are (e.g. {taken}, {total}, {date}, {name}).

     VOICE: we sound like a game menu (loot, lock in, squad vote, GG)
     but never so much that people don't get it. Checkout, payment,
     contact and the footer stay in plain normal words — on purpose.
     ------------------------------------------------------------------- */
  ui: {

    /* --- Language switcher --- */
    langNames: { en: "EN", nl: "NL", vi: "VI" },

    /* --- Season label (top of the page, like a season pass) --- */
    season: { en: "Season 01 · Monsoon", nl: "Season 01 · Moesson", vi: "Season 01 · Mùa mưa" },

    /* --- Top menu --- */
    nav: {
      shop:     { en: "Loot",       nl: "Loot",        vi: "Kho đồ" },
      drops:    { en: "Drops",      nl: "Drops",       vi: "Drops" },
      polls:    { en: "Squad vote", nl: "Squad vote",  vi: "Cả hội vote" },
      story:    { en: "Our story",  nl: "Ons verhaal", vi: "Về tụi mình" },
      founders: { en: "The squad",  nl: "De squad",    vi: "Biệt đội" },
      wishlist: { en: "Wishlist",   nl: "Wishlist",    vi: "Yêu thích" },
      cart:     { en: "Loadout",    nl: "Loadout",     vi: "Túi đồ" },
      contact:  { en: "Contact",    nl: "Contact",     vi: "Liên hệ" }
    },

    /* --- Big intro at the top of the page --- */
    hero: {
      // The big headline. headlineLines = the same text split in 2 lines
      // (the 2nd line is shown in lime).
      headline: {
        en: "Spotted there. Carried here.",
        nl: "Daar gespot. Hier gebracht.",
        vi: "Thấy bên kia, xách về bên này."
      },
      headlineLines: {
        en: ["Spotted there.", "Carried here."],
        nl: ["Daar gespot.", "Hier gebracht."],
        vi: ["Thấy bên kia,", "xách về bên này."]
      },
      // The BIG headline at the very top of the home page, in 2 lines
      // (2nd line in lime). "Spotted there. Carried here." is now the
      // title above the loot grid.
      lootLines: {
        en: ["Loot from", "two worlds."],
        nl: ["Loot uit", "twee werelden."],
        vi: ["Đồ xịn từ", "hai thế giới."]
      },
      subline: {
        en: "Duy & Dan in Amsterdam, Tung in Sài Gòn. They spot it first, you lock in a pre-order spot, the squad carries it 9,800 km to you.",
        nl: "Duy en Dan in Amsterdam, Tung in Sài Gòn. Zij spotten het als eerste, jij lockt een pre-orderplek, de squad brengt het 9.800 km naar jou.",
        vi: "Duy với Đan ở Amsterdam, Tùng ở Sài Gòn. Tụi mình săn trước, bạn chốt suất đặt trước, cả đội xách về 9.800 cây số tới tay bạn."
      },
      ctaPrimary:   { en: "See the loot",        nl: "Check de loot",       vi: "Xem kho đồ" },
      ctaSecondary: { en: "How pre-order works", nl: "Zo werkt pre-orderen", vi: "Đặt trước là sao?" },
      clockLabel: {
        en: "Right now in",
        nl: "Nu in",
        vi: "Giờ này ở"
      }
    },

    /* --- Section headings --- */
    sections: {
      loot:     { en: "Loot from two worlds",     nl: "Loot uit twee werelden",    vi: "Đồ xịn từ hai thế giới" },
      products: { en: "Pre-order now",            nl: "Nu te pre-orderen",         vi: "Đang mở đặt trước" },
      drops:    { en: "Drops",                    nl: "Drops",                     vi: "Drops" },
      polls:    { en: "Squad vote: what do we bring next?", nl: "Squad vote: wat halen we hierna?", vi: "Cả hội vote: đợt tới mang gì về?" },
      founders: { en: "The squad",                nl: "De squad",                  vi: "Biệt đội" },
      howItWorks: { en: "How pre-order works",    nl: "Zo werkt pre-orderen",      vi: "Đặt trước là sao?" },
      story:    { en: "Our story",                nl: "Ons verhaal",               vi: "Chuyện tụi mình" },
      wishlist: { en: "Your wishlist",            nl: "Jouw wishlist",             vi: "Danh sách yêu thích" },
      cart:     { en: "Your loadout",             nl: "Jouw loadout",              vi: "Túi đồ của bạn" },
      checkout: { en: "Checkout",                 nl: "Afrekenen",                 vi: "Thanh toán" },
      contact:  { en: "Contact to order",         nl: "Bestellen via bericht",     vi: "Nhắn tin để đặt hàng" }
    },

    /* --- Filters on the shop --- */
    filters: {
      all:    { en: "All loot",     nl: "Alle loot",      vi: "Tất cả" },
      fromVN: { en: "From Vietnam", nl: "Uit Vietnam",    vi: "Từ Việt Nam" },
      fromNL: { en: "From NL",      nl: "Uit Nederland",  vi: "Từ Hà Lan" }
    },

    /* --- Category names (must match product "category" words) --- */
    categories: {
      "card-games":   { en: "Card games",        nl: "Kaartspellen",      vi: "Game bài" },
      "snacks":       { en: "Snacks",            nl: "Snacks",            vi: "Đồ ăn vặt" },
      "stationery":   { en: "Stationery",        nl: "Schoolspullen",     vi: "Văn phòng phẩm" },
      "phone":        { en: "Phone accessories", nl: "Telefoonaccessoires", vi: "Phụ kiện điện thoại" },
      "collectibles": { en: "Collectibles",      nl: "Collectibles",      vi: "Đồ sưu tầm" },
      "tshirts":      { en: "T-shirts",          nl: "T-shirts",          vi: "Áo thun" },
      "cubes":        { en: "Speed cubes",       nl: "Speedcubes",        vi: "Speedcube" },
      "bags":         { en: "School bags",       nl: "Schooltassen",      vi: "Balo đi học" }
    },

    /* --- Rarity labels (match product "rarity") ---
       Dutch teens just use the English game words, so NL stays English.
       VI uses the words Vietnamese games use. */
    rarityTitle: { en: "Rarity", nl: "Rarity", vi: "Độ hiếm" },
    rarity: {
      common:    { en: "Common",    nl: "Common",    vi: "Thường" },
      rare:      { en: "Rare",      nl: "Rare",      vi: "Hiếm" },
      epic:      { en: "Epic",      nl: "Epic",      vi: "Sử thi" },
      legendary: { en: "Legendary", nl: "Legendary", vi: "Huyền thoại" }
    },

    /* --- Origin badges --- */
    origin: {
      VN: { en: "🇻🇳 VN → NL", nl: "🇻🇳 VN → NL", vi: "🇻🇳 VN → NL" },
      NL: { en: "🇳🇱 NL → VN", nl: "🇳🇱 NL → VN", vi: "🇳🇱 NL → VN" }
    },

    /* --- Product status labels (match product "status") --- */
    status: {
      open:     { en: "Open",           nl: "Open",           vi: "Đang mở" },
      almost:   { en: "Almost full",    nl: "Bijna vol",      vi: "Sắp full" },
      shipping: { en: "In transit",     nl: "Onderweg",       vi: "Đang về" },
      soldout:  { en: "Sold out · GG",  nl: "Uitverkocht · GG", vi: "Hết suất · GG" }
    },

    /* --- Drop-feed tag labels (match drop "tag") --- */
    dropTags: {
      "just-landed": { en: "Just landed",  nl: "Net geland",   vi: "Vừa về" },
      "spotted":     { en: "Spotted",      nl: "Gespot",       vi: "Mới săn được" },
      "restock":     { en: "Restock",      nl: "Weer binnen",  vi: "Có hàng lại" },
      "shipping":    { en: "In transit",   nl: "Onderweg",     vi: "Đang về" },
      "last-call":   { en: "Last call",    nl: "Laatste kans", vi: "Sắp chốt" },
      "poll":        { en: "Squad vote",   nl: "Squad vote",   vi: "Cả hội vote" }
    },

    /* --- Small product-card texts --- */
    product: {
      spotsLeft:   { en: "{taken}/{total} locked in",        nl: "{taken}/{total} gelockt",          vi: "Đã chốt {taken}/{total} suất" },
      closes:      { en: "Pre-order closes {date}",          nl: "Pre-order sluit op {date}",        vi: "Chốt đơn ngày {date}" },
      spottedBy:   { en: "Spotted by {name}",                nl: "Gespot door {name}",               vi: "{name} săn được" },
      approxVND:   { en: "≈ {vnd} ₫",                        nl: "≈ {vnd} ₫",                        vi: "≈ {vnd} ₫" },
      viewProduct: { en: "Inspect",                          nl: "Bekijk",                           vi: "Xem chi tiết" }
    },

    /* --- Buttons --- */
    buttons: {
      addToCart:     { en: "Lock in",           nl: "Lock in",            vi: "Chốt luôn" },
      preorder:      { en: "Pre-order",         nl: "Pre-order",          vi: "Đặt trước" },
      wishlistAdd:   { en: "Save to wishlist",  nl: "Op je wishlist",     vi: "Lưu vào yêu thích" },
      wishlistRemove:{ en: "Remove from wishlist", nl: "Van je wishlist halen", vi: "Bỏ khỏi yêu thích" },
      checkout:      { en: "Checkout",          nl: "Afrekenen",          vi: "Thanh toán" },
      contactToOrder:{ en: "Contact to order",  nl: "Stuur ons een bericht", vi: "Nhắn tin đặt hàng" },
      vote:          { en: "Vote",              nl: "Stem",               vi: "Vote" },
      voted:         { en: "Voted ✓",           nl: "Gestemd ✓",          vi: "Đã vote ✓" },
      remove:        { en: "Remove",            nl: "Verwijderen",        vi: "Xóa" },
      continueShopping: { en: "Back to the loot", nl: "Terug naar de loot", vi: "Xem tiếp kho đồ" },
      placeOrder:    { en: "Place pre-order",   nl: "Pre-order plaatsen", vi: "Đặt trước" },
      send:          { en: "Send",              nl: "Versturen",          vi: "Gửi" },
      close:         { en: "Close",             nl: "Sluiten",            vi: "Đóng" },
      notifyMe:      { en: "Notify me next season", nl: "Hou me op de hoogte", vi: "Báo mình đợt sau" }
    },

    /* --- Squad vote (polls) --- */
    pollTexts: {
      totalVotes: { en: "{count} votes",           nl: "{count} stemmen",              vi: "{count} lượt vote" },
      thanks:     { en: "Vote locked in. Good taste.", nl: "Stem gelockt. Goeie smaak.", vi: "Đã ghi nhận. Gu xịn đó." },
      closed:     { en: "Vote closed",             nl: "Stemmen gesloten",             vi: "Đã đóng vote" }
    },

    /* --- How it works (3–4 steps) --- */
    howItWorks: [
      {
        emoji: "👀",
        title: { en: "We spot it",     nl: "Wij spotten het",   vi: "Tụi mình săn hàng" },
        text: {
          en: "One of the squad finds something cool in Amsterdam or Sài Gòn that you can't get on the other side.",
          nl: "Iemand van de squad vindt iets vets in Amsterdam of Sài Gòn dat je aan de andere kant niet kan krijgen.",
          vi: "Một đứa trong đội tìm được món hay ở Amsterdam hoặc Sài Gòn mà bên kia chưa có."
        }
      },
      {
        emoji: "✋",
        title: { en: "You lock in", nl: "Jij lockt in",    vi: "Bạn chốt suất" },
        text: {
          en: "Lock in a pre-order spot before the timer runs out. Limited spots per batch, so don't wait too long.",
          nl: "Lock een pre-orderplekje voordat de timer afloopt. Elke batch heeft maar een paar plekken, dus wacht niet te lang.",
          vi: "Chốt suất đặt trước trước khi hết giờ. Mỗi đợt có giới hạn, chần chừ là hết."
        }
      },
      {
        emoji: "📦",
        title: { en: "We buy & ship",  nl: "Wij kopen en versturen", vi: "Tụi mình mua & gửi" },
        text: {
          en: "When the pre-order closes, we buy everything in one go and send it across. Follow it in the Drops.",
          nl: "Als de pre-order dicht is, kopen we alles in één keer en sturen het op. Je kan het volgen in de Drops.",
          vi: "Chốt đơn xong tụi mình mua một lần rồi gửi qua. Theo dõi hành trình ở mục Drops nha."
        }
      },
      {
        emoji: "🤙",
        title: { en: "Loot lands", nl: "Loot geland", vi: "Đồ về tới tay" },
        text: {
          en: "Usually 2–3 weeks from closing day. Then flex it, play it, eat it.",
          nl: "Meestal 2 à 3 weken na de sluitdatum. Daarna: flexen, spelen, opeten.",
          vi: "Thường 2–3 tuần sau ngày chốt đơn. Rồi khoe, chơi, ăn — tùy bạn."
        }
      }
    ],

    /* --- Our story --- */
    story: {
      en: "Duy and Dan grew up in Amsterdam, Tung lives in Sài Gòn. Every time someone visited, the suitcase came back full of stuff friends kept asking about — snacks, card games, little things you just can't find on the other side. So we turned it into VBros: we spot it, you pre-order, we bring it over. Two cities, one group chat, zero middlemen.",
      nl: "Duy en Dan zijn opgegroeid in Amsterdam, Tung woont in Sài Gòn. Elke keer als iemand op bezoek ging, kwam de koffer terug vol spullen waar vrienden steeds naar vroegen: snacks, kaartspellen, kleine dingen die je aan de andere kant gewoon niet vindt. Dus hebben we er VBros van gemaakt: wij spotten het, jij pre-ordert, wij nemen het mee. Twee steden, één groepsapp, geen tussenpersonen.",
      vi: "Duy với Đan lớn lên ở Amsterdam, còn Tùng sống ở Sài Gòn. Mỗi lần có ai qua lại, vali về là đầy đồ mà tụi bạn cứ hỏi hoài — snack, game bài, mấy món nhỏ nhỏ bên kia không có. Vậy là tụi mình lập ra VBros: tụi mình săn, bạn đặt trước, tụi mình mang về. Hai thành phố, một group chat, không qua trung gian."
    },

    /* --- Wishlist --- */
    wishlist: {
      emptyTitle: { en: "Nothing here yet",  nl: "Nog niks hier",      vi: "Chưa có gì hết" },
      emptyText: {
        en: "Tap the ♡ on any loot you like and it'll wait for you here.",
        nl: "Tik op het ♡ bij loot die je vet vindt, dan staat het hier voor je klaar.",
        vi: "Bấm ♡ vào món bạn thích, nó sẽ nằm đây chờ bạn."
      }
    },

    /* --- Cart (we call it "Loadout" in the menu) ---
       Prices & totals stay in plain words. */
    cart: {
      empty: {
        en: "Your loadout is empty. The loot won't lock itself in 👀",
        nl: "Je loadout is leeg. De loot gaat zichzelf niet locken 👀",
        vi: "Túi đồ trống trơn. Đồ không tự chốt được đâu 👀"
      },
      quantity: { en: "Qty",       nl: "Aantal",       vi: "SL" },
      subtotal: { en: "Subtotal",  nl: "Subtotaal",    vi: "Tạm tính" },
      shipping: { en: "Shipping",  nl: "Verzending",   vi: "Phí ship" },
      total:    { en: "Total",     nl: "Totaal",       vi: "Tổng cộng" },
      preorderNote: {
        en: "These are pre-orders: we buy after the pre-order closes, then ship. Delivery dates are estimates.",
        nl: "Dit zijn pre-orders: we kopen pas als de pre-order sluit en sturen het daarna op. Levertijden zijn een schatting.",
        vi: "Đây là hàng đặt trước: chốt đơn xong tụi mình mới mua rồi gửi. Thời gian giao chỉ là dự kiến."
      }
    },

    /* --- Checkout ---
       PLAIN WORDS ONLY here (no game slang) — this is about money. */
    checkout: {
      previewNotice: {
        en: "Preview — no payment taken",
        nl: "Preview — er wordt niks betaald",
        vi: "Bản xem thử — không thu tiền"
      },
      parentNudge: {
        en: "Under 18? Ask a parent to pay — they'll probably want to try the snacks anyway 😉",
        nl: "Onder de 18? Vraag even een ouder om te betalen — die wil waarschijnlijk toch ook van de snacks proeven 😉",
        vi: "Chưa đủ 18? Nhờ ba mẹ thanh toán giúp nha — chắc ba mẹ cũng muốn ăn ké snack á 😉"
      },
      yourDetails:   { en: "Your details",      nl: "Je gegevens",       vi: "Thông tin của bạn" },
      name:          { en: "Name",              nl: "Naam",              vi: "Tên" },
      email:         { en: "Email",             nl: "E-mail",            vi: "Email" },
      address:       { en: "Delivery address",  nl: "Bezorgadres",       vi: "Địa chỉ nhận hàng" },
      postcode:      { en: "Postcode",          nl: "Postcode",          vi: "Mã bưu chính" },
      city:          { en: "City",              nl: "Plaats",            vi: "Thành phố" },
      country:       { en: "Country",           nl: "Land",              vi: "Quốc gia" },
      shippingTitle: { en: "Shipping",          nl: "Verzending",        vi: "Vận chuyển" },
      paymentTitle:  { en: "Payment",           nl: "Betalen",           vi: "Thanh toán" },
      paymentPlanned:{ en: "Coming soon — these are the methods we're planning.", nl: "Komt eraan — deze betaalmethodes staan op de planning.", vi: "Sắp có — đây là các cách thanh toán tụi mình dự tính." },
      days:          { en: "{min}–{max} days",  nl: "{min}–{max} dagen", vi: "{min}–{max} ngày" },

      /* Shipping options. min/max = estimated delivery days. */
      shippingOptions: [
        // ↓↓↓ EXAMPLE — copy this block to add a shipping option ↓↓↓
        {
          id: "intl-post",
          route: "VN⇄NL",
          priceEUR: 8.5,
          min: 10,
          max: 18,
          label: {
            en: "VN ⇄ NL standard post",
            nl: "VN ⇄ NL standaard post",
            vi: "Bưu điện quốc tế VN ⇄ NL"
          }
        },
        // ↑↑↑ end of example ↑↑↑
        {
          id: "postnl-nl",
          route: "NL",
          priceEUR: 4.95,
          min: 1,
          max: 2,
          label: {
            en: "PostNL — within the Netherlands",
            nl: "PostNL — binnen Nederland",
            vi: "PostNL — trong Hà Lan"
          }
        },
        {
          id: "postnl-eu",
          route: "EU",
          priceEUR: 9.95,
          min: 3,
          max: 6,
          label: {
            en: "PostNL — rest of the EU",
            nl: "PostNL — rest van de EU",
            vi: "PostNL — các nước EU khác"
          }
        },
        {
          id: "dhl-eu",
          route: "EU",
          priceEUR: 12.95,
          min: 2,
          max: 4,
          label: {
            en: "DHL — EU, faster",
            nl: "DHL — EU, sneller",
            vi: "DHL — EU, nhanh hơn"
          }
        }
      ],

      /* Payment methods (planned — not live in the preview). */
      paymentMethods: [
        { id: "ideal",  region: "NL",    label: { en: "iDEAL",              nl: "iDEAL",                vi: "iDEAL" } },
        { id: "card",   region: "NL/EU", label: { en: "Credit / debit card", nl: "Creditcard / debitcard", vi: "Thẻ tín dụng / ghi nợ" } },
        { id: "paypal", region: "NL/EU", label: { en: "PayPal",             nl: "PayPal",               vi: "PayPal" } },
        { id: "momo",   region: "VN",    label: { en: "MoMo",               nl: "MoMo",                 vi: "Ví MoMo" } },
        { id: "bank",   region: "VN",    label: { en: "Bank transfer (VN)", nl: "Bankoverschrijving (VN)", vi: "Chuyển khoản ngân hàng" } }
      ],

      /* Preview confirmation — must stay honest: NO order, NO payment. */
      confirmTitle: {
        en: "Preview finished 🙌",
        nl: "Preview klaar 🙌",
        vi: "Xong bản xem thử 🙌"
      },
      confirmText: {
        en: "This is a preview, so no payment was taken and no order was placed. When the real shop goes live, this is where you'll get your order number.",
        nl: "Dit is een preview, dus er is niks betaald en geen bestelling geplaatst. Als de echte shop live gaat, krijg je hier je bestelnummer.",
        vi: "Đây chỉ là bản xem thử nên chưa thu tiền và chưa tạo đơn thật. Khi shop chính thức chạy, mã đơn hàng sẽ hiện ở đây."
      }
    },

    /* --- Contact-to-order form ---
       Plain words. Must stay honest: in the preview NOTHING is sent. */
    contactForm: {
      intro: {
        en: "Rather just message us? Fill this in and one of the squad gets back to you.",
        nl: "Liever gewoon een berichtje sturen? Vul dit in, dan reageert iemand van de squad.",
        vi: "Thích nhắn tin hơn? Điền vào đây, một đứa trong đội sẽ trả lời bạn."
      },
      name:    { en: "Your name",            nl: "Je naam",               vi: "Tên bạn" },
      contact: { en: "Email or Insta handle", nl: "E-mail of Insta-naam",  vi: "Email hoặc Insta" },
      item:    { en: "Which item?",          nl: "Welk item?",            vi: "Bạn muốn món nào?" },
      message: { en: "Message (size, colour, questions…)", nl: "Bericht (maat, kleur, vragen…)", vi: "Lời nhắn (size, màu, thắc mắc…)" },
      itemPlaceholder: { en: "Pick an item", nl: "Kies een item", vi: "Chọn một món" },
      sent: {
        en: "This is a preview, so your message didn't go anywhere. Until the real shop is live, email the bros directly at:",
        nl: "Dit is een preview, dus je bericht is nergens heen gegaan. Tot de echte shop live is, mail je de bros direct op:",
        vi: "Đây là bản xem thử nên tin nhắn chưa được gửi đi. Trong lúc chờ shop chạy thật, bạn email trực tiếp cho tụi mình ở:"
      }
    },

    /* --- Footer / legal (plain words) --- */
    footer: {
      runBy: {
        en: "VBros is run by Duy, Dan & Tung, with their parents as legal operators.",
        nl: "VBros wordt gerund door Duy, Dan & Tung. Hun ouders zijn officieel de exploitanten.",
        vi: "VBros do Duy, Đan & Tùng vận hành, với ba mẹ là người đại diện pháp lý."
      },
      kvk:     { en: "KvK: [KvK pending]",   nl: "KvK: [KvK pending]",   vi: "KvK: [KvK pending]" },
      address: { en: "Address: [address pending]", nl: "Adres: [adres volgt]", vi: "Địa chỉ: [đang cập nhật]" },
      email: "hello@vbros.example",
      tagline: {
        en: "Amsterdam ⇄ Sài Gòn. Bro to bro.",
        nl: "Amsterdam ⇄ Sài Gòn. Bro to bro.",
        vi: "Amsterdam ⇄ Sài Gòn. Bro to bro."
      }
    }
  }
};
