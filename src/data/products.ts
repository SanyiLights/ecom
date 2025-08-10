import { Category } from './categories';

export interface Product {
  model: string;
  description: string;
  features?: string[];
  image: string;
  category: Category;
  video?: string;
  manual?: string;
}

export const products: Product[] = [
  {
    "id": "1",
    "description": "SOLSTICE QUAD 616F",
    "image": "https://static.wixstatic.com/media/4f23bc_226667a7a0264b0aae8abec3483fa0f0~mv2.jpg/v1/crop/x_1392,y_293,w_2782,h_2782/fill/w_115,h_113,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E6%AD%A3_JPG.jpg",
    "category": Category.STATIC_LIGHTS,
    "description": "SOLSTICE QUAD 616F - Professional lighting equipment",
    "video": "https://www.youtube.com/watch?v=PHGPwOyD0kY",
    "manual": "https://drive.google.com/drive/folders/1zovlTR-YQI6eSgASwfmlA-mP32vvuef_?usp=drive_link"
  },
  {
    "id": "2",
    "description": "SOLSTICE DUO 616C",
    "image": "https://static.wixstatic.com/media/4f23bc_b538fe93d35e42ab936756d963b9e0c8~mv2.png/v1/crop/x_374,y_259,w_2425,h_2425/fill/w_115,h_113,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E6%AD%A3_edited.png",
    "category": Category.STATIC_LIGHTS,
    "description": "SOLSTICE DUO 616C - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1Mwy_dEh4BRHwg796YIAIJakaYM3hVNLM?usp=drive_link"
  },
  {
    "id": "9",
    "description": "HUEWAVE PL 2410IP",
    "image": "https://static.wixstatic.com/media/4f23bc_e9e30e2603b3422aa50bdb46aabc2cd3~mv2.jpg/v1/crop/x_1192,y_186,w_2997,h_2961/fill/w_130,h_128,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E6%AD%A3.jpg",
    "category": Category.STATIC_LIGHTS,
    "description": "HUEWAVE PL 2410IP - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/15djbaU5U7XqhjfZRAghSCQ_BGZTfNMA0?usp=drive_link"
  },
  {
    "id": "14",
    "description": "DUALTONE PAR L450",
    "image": "https://static.wixstatic.com/media/4f23bc_991272a3ae9c4595b2eafa4a4d715e13~mv2.jpg/v1/crop/x_1690,y_969,w_2981,h_2946/fill/w_130,h_128,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E6%AD%A3.jpg",
    "category": Category.STATIC_LIGHTS,
    "description": "DUALTONE PAR L450 - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1lLX4MsvEbfTO34p5R7DiZ9nuts5rPLYc?usp=drive_link"
  },
  {
    "id": "15",
    "description": "DUALTONE PAR L750",
    "image": "https://static.wixstatic.com/media/030325_46b4627d8fbe442fa64ab58d337c6088~mv2.jpg/v1/fill/w_130,h_128,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/SPL-LED-P750%201_edited.jpg",
    "category": Category.STATIC_LIGHTS,
    "description": "DUALTONE PAR L750 - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1zLV5JqQy9XJuaRz26Q10RuqKUN0FA4Rr?usp=drive_link"
  },
  {
    "id": "19",
    "description": "SOLSTICE DUO 616IP",
    "image": "https://static.wixstatic.com/media/4f23bc_3fdd0a56a36a45258a06f2f0d548bb34~mv2.png/v1/fill/w_115,h_113,fp_0.46_0.63,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/616IP.png",
    "category": Category.STATIC_LIGHTS,
    "description": "SOLSTICE DUO 616IP - Professional lighting equipment",
    "video": "",
    "manual": ""
  },
  {
    "id": "25",
    "description": "HEMERA DMX C192",
    "image": "https://static.wixstatic.com/media/4f23bc_d896749fd6714a4db7419bbe85e9cec7~mv2.png/v1/crop/x_326,y_340,w_2349,h_2321/fill/w_155,h_153,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E6%AD%A3_edited.png",
    "category": Category.CONTROLLER,
    "description": "HEMERA DMX C192 - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1_HlXRZpX8NLlJvwneN9kn-dS62ehyhPm?usp=drive_link"
  },
  {
    "id": "26",
    "description": "HEMERA DMX C384",
    "image": "https://static.wixstatic.com/media/4f23bc_f460ee9edbb244d295d6738a0ffbd456~mv2.jpg/v1/fill/w_155,h_153,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E6%AD%A31.jpg",
    "category": Category.CONTROLLER,
    "description": "HEMERA DMX C384 - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1MQN5zGvKh-Z2JddgDzitjBeW02jPN8Ir?usp=drive_link"
  },
  {
    "id": "27",
    "description": "EMPOWERER UNI4",
    "image": "https://static.wixstatic.com/media/4f23bc_ba138cb42ae148c2b21372af701af3d9~mv2.png/v1/fill/w_155,h_153,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/IEU4%E6%AD%A3_edited.png",
    "category": Category.CONTROLLER,
    "description": "EMPOWERER UNI4 - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/14gTlBwWJEwtjR7eD7dDHSX1bpPzL302h?usp=drive_link"
  },
  {
    "id": "28",
    "description": "EMPOWERER MINI2",
    "image": "https://static.wixstatic.com/media/4f23bc_28c75d1f87ce47398f02469d40a5e75f~mv2.jpg/v1/crop/x_1315,y_374,w_3129,h_3092/fill/w_155,h_153,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E6%AD%A3.jpg",
    "category": Category.CONTROLLER,
    "description": "EMPOWERER MINI2 - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1E3-_eyb5qyeucFivSWPBhXjb5o_h0vJn?usp=drive_link"
  },
  {
    "id": "29",
    "description": "VERSATILIS LUCIDUS 1000",
    "image": "https://static.wixstatic.com/media/4f23bc_102e831a9b914745bc8f28c918e4e948~mv2.jpg/v1/fill/w_132,h_132,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/SPL-PRO-1000HBRT.jpg",
    "category": Category.AUTOMATIC_LIGHTS,
    "description": "VERSATILIS LUCIDUS 1000 - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/16dfZL5txCdO6S0rZ-P6GM-K02Hn0oQ7n?usp=drive_link"
  },
  {
    "id": "30",
    "description": "VIVAX J300B IP",
    "image": "https://static.wixstatic.com/media/4f23bc_60dc28fea80048cfa3ba8aae1f34a334~mv2.png/v1/crop/x_297,y_243,w_4775,h_4775/fill/w_132,h_132,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/J300%E6%AD%A32.png",
    "category": Category.AUTOMATIC_LIGHTS,
    "description": "VIVAX J300B IP - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1k5JDPoXo7SZ167H3prYKy9Yqkvi5Q2lx?usp=drive_link"
  },
  {
    "id": "31",
    "description": "VERSATILIS 680CMY",
    "image": "https://static.wixstatic.com/media/4f23bc_e3165d2a06d842438f6029950aef8be8~mv2.jpg/v1/crop/x_57,y_106,w_1749,h_1749/fill/w_132,h_132,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/680-1_edited.jpg",
    "category": Category.AUTOMATIC_LIGHTS,
    "description": "VERSATILIS 680CMY - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1cezc1n9J5_Jwe5-Je68JhjpzO3UAi-ix?usp=drive_link"
  },
  {
    "id": "32",
    "description": "JUBARIS BEAM L200",
    "image": "https://static.wixstatic.com/media/4f23bc_a3f3c86d6b6c4d62936328e97da8812b~mv2.png/v1/crop/x_197,y_360,w_2509,h_2509/fill/w_132,h_132,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/200%E6%AD%A3_edited.png",
    "category": Category.AUTOMATIC_LIGHTS,
    "description": "JUBARIS BEAM L200 - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1ZFgk6bX3FUD9kpuKrvgJahO7RP-684vN?usp=drive_link"
  },
  {
    "id": "33",
    "description": "VERSATILIS IMPERVIUS 1000",
    "image": "https://static.wixstatic.com/media/4f23bc_25dd9012d3824f78be245573caa147c6~mv2.png/v1/crop/x_225,y_201,w_2491,h_2491/fill/w_132,h_132,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/SPL-PRO-1000IP_edited.png",
    "category": Category.AUTOMATIC_LIGHTS,
    "description": "VERSATILIS IMPERVIUS 1000 - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1dY4YNG3bxtuLv3DBDMARMBpqfe2m7InH?usp=drive_link"
  },
  {
    "id": "34",
    "description": "VERSATILIS VERUS 1000",
    "image": "https://static.wixstatic.com/media/4f23bc_ba7a69fafeac4e0e88c736bd150081a1~mv2.jpg/v1/fill/w_132,h_132,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/1000HCRI%E6%AD%A3.jpg",
    "category": Category.AUTOMATIC_LIGHTS,
    "description": "VERSATILIS VERUS 1000 - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1MrbSiLRHajG3PWoeS5xdMx2SDX5bc2w0?usp=drive_link"
  },
  {
    "id": "35",
    "description": "PULSARIS 3000IP",
    "image": "https://static.wixstatic.com/media/4f23bc_edbaa8da09a94fd3b7269021480befcf~mv2.jpg/v1/fill/w_132,h_132,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/3000%E6%AD%A3_edited.jpg",
    "category": Category.AUTOMATIC_LIGHTS,
    "description": "PULSARIS 3000IP - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1h0xhb1EOO5sK2ublIE0Yqiw_pm1tt2tf?usp=drive_link"
  },
  {
    "id": "36",
    "description": "SPOTTY LED 150",
    "image": "https://static.wixstatic.com/media/4f23bc_c8466aec574446eb9835087fee1fe570~mv2.png/v1/crop/x_200,y_175,w_2307,h_2307/fill/w_132,h_132,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/150%E6%AD%A32_edited.png",
    "category": Category.AUTOMATIC_LIGHTS,
    "description": "SPOTTY LED 150 - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/135bSJY7-qY7-vGJIKX8n3BfsMs5h0Dnz?usp=drive_link"
  },
  {
    "id": "37",
    "description": "JUBARIS BEAM 551",
    "image": "https://static.wixstatic.com/media/030325_b5da0acf0ab742e79b39ee1b3b8cfbd9~mv2.jpg/v1/fill/w_132,h_132,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/SPL-MHL-M551B%20IP%201_edited_edited.jpg",
    "category": Category.AUTOMATIC_LIGHTS,
    "description": "JUBARIS BEAM 551 - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1jLiniAUGaEwkcN_dh05VNarMCFETaHfG?usp=drive_link"
  },
  {
    "id": "38",
    "description": "JUBARIS BEAM 380IP",
    "image": "https://static.wixstatic.com/media/4f23bc_85ca9d999f624372afcb4f80547bbf8f~mv2.jpeg/v1/fill/w_132,h_132,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/380%E6%AD%A33.jpeg",
    "category": Category.AUTOMATIC_LIGHTS,
    "description": "JUBARIS BEAM 380IP - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1oaMXCjTNj-OmlaVyUgN92aXEsXLWT-xn?usp=drive_link"
  },
  {
    "id": "39",
    "description": "JUBARIS BEAM 300",
    "image": "https://static.wixstatic.com/media/4f23bc_ce92049d361b4e59a3bfb2e1faa4b2e9~mv2.jpg/v1/crop/x_1110,y_382,w_3266,h_3266/fill/w_132,h_132,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/300B%E6%AD%A3.jpg",
    "category": Category.AUTOMATIC_LIGHTS,
    "description": "JUBARIS BEAM 300 - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1xpFM7OvSHW4vzMmTspj9RPswANmx_LMY?usp=drive_link"
  },
  {
    "id": "40",
    "description": "VERSATILIS 480CMY",
    "image": "https://static.wixstatic.com/media/030325_8756f8331f634d00990ef2682f1be8e9~mv2.jpg/v1/crop/x_26,y_26,w_516,h_516/fill/w_104,h_104,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/SPL-LED-480CMY11_edited_edited_edited_edited.jpg",
    "category": Category.AUTOMATIC_LIGHTS,
    "description": "VERSATILIS 480CMY - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1tPclIoLlpNiBRI7gdYMaBXU8KNU6YQ-q"
  },
  {
    "id": "41",
    "description": "STELLA WASH 1940IP",
    "image": "https://static.wixstatic.com/media/4f23bc_9a1e8acb6dd547dc9d7e35054c635552~mv2.jpg/v1/fill/w_132,h_132,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/SPL-LED-1940F%20IP%2015.jpg",
    "category": Category.AUTOMATIC_LIGHTS,
    "description": "STELLA WASH 1940IP - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1dCLJQolXu-Yiug2C22f4DgEWmiHObEVA?usp=drive_link"
  },
  {
    "id": "42",
    "description": "STELLA WASH 1920F",
    "image": "https://static.wixstatic.com/media/4f23bc_eea45a2168554a0c9c16594bd40e50af~mv2.jpg/v1/crop/x_18,y_25,w_639,h_639/fill/w_132,h_132,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/1920%E6%AD%A33.jpg",
    "category": Category.AUTOMATIC_LIGHTS,
    "description": "STELLA WASH 1920F - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1_rUasdCqdU5MQIA6BYd8-nTA8QlPlZZI?usp=drive_link"
  },
  {
    "id": "43",
    "description": "STELLA WASH 740F",
    "image": "https://static.wixstatic.com/media/4f23bc_fd29d9d12dca4a0ab097727347dfb9bc~mv2.jpeg/v1/crop/x_17,y_24,w_697,h_697/fill/w_132,h_132,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/SPL-LED-740F9.jpeg",
    "category": Category.AUTOMATIC_LIGHTS,
    "description": "STELLA WASH 740F - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1AnpQkAEH1WV443pb3oFr6Rt2dbhD0p56?usp=drive_link"
  },
  {
    "id": "44",
    "description": "STELLA WASH 1940F",
    "image": "https://static.wixstatic.com/media/4f23bc_2ab9768dfaf64bebb9b34739f7b09794~mv2.jpg/v1/crop/x_206,y_267,w_2120,h_2120/fill/w_132,h_132,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/SPL-LED-1940F%20%203.jpg",
    "category": Category.AUTOMATIC_LIGHTS,
    "description": "STELLA WASH 1940F - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1KyP62Z98ysWxhyD6XuGUz3qoeNwzl2AE?usp=drive_link"
  },
  {
    "id": "45",
    "description": "VIVID TREAD 1260YZ",
    "image": "https://static.wixstatic.com/media/4f23bc_f26efbad8766441a80191d65e1c9649b~mv2.webp/v1/fill/w_132,h_132,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E6%AD%A31.webp",
    "category": Category.AUTOMATIC_LIGHTS,
    "description": "VIVID TREAD 1260YZ - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1__AvPdWr7lSYuUbZ70pDLF_eKTLVwpVv?usp=drive_link"
  },
  {
    "id": "46",
    "description": "HUEWAVE MOVING HEAD 1915Z",
    "image": "https://static.wixstatic.com/media/4f23bc_675263775298458f8467df70457025b5~mv2.jpg/v1/fill/w_132,h_132,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/1915%E6%AD%A31_edited.jpg",
    "category": Category.AUTOMATIC_LIGHTS,
    "description": "HUEWAVE MOVING HEAD 1915Z - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/17QXW4dobPIvFUBr4KKob1TZKUe2XL3s3?usp=drive_link"
  },
  {
    "id": "49",
    "description": "LEVATIO BALL",
    "image": "https://static.wixstatic.com/media/4f23bc_7b70537b830e4e74894748e677b62e36~mv2.jpg/v1/fill/w_115,h_113,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/R201%E6%AD%A3_edited.jpg",
    "category": Category.EFFECT_LIGHT,
    "description": "LEVATIO BALL - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1GEDXcz85nlC33X0xscu0-0l4Qv40SPhD?usp=drive_link"
  },
  {
    "id": "50",
    "description": "VINTAGE CIRCULUS 7",
    "image": "https://static.wixstatic.com/media/4f23bc_be68b05e101b4cf1b9b755fb1426c30c~mv2.jpg/v1/fill/w_115,h_113,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/CIRC7%E6%AD%A3_edited.jpg",
    "category": Category.EFFECT_LIGHT,
    "description": "VINTAGE CIRCULUS 7 - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/19rOYmeauAENYnLXpogLlZFBkZZQK3Tlw?usp=drive_link"
  },
  {
    "id": "56",
    "description": "MIST 2L",
    "image": "https://static.wixstatic.com/media/4f23bc_7ad55db035fd4002b0eaee637d4b4896~mv2.jpg/v1/fill/w_67,h_97,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/mist_2L.jpg",
    "category": Category.EFFECT_MACHINE,
    "description": "MIST 2L - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1I5PXT5uNtbNeaL4KHjfo8zYEJfLWySSI?usp=drive_link"
  },
  {
    "id": "58",
    "description": "VINTAGE COLUMNA 6",
    "image": "https://static.wixstatic.com/media/4f23bc_6a066106d477424c9ba8c5122a5fcb94~mv2.png/v1/fill/w_115,h_113,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/SPL-VINT-COLM6%20(1)_edited.png",
    "category": Category.EFFECT_LIGHT,
    "description": "VINTAGE COLUMNA 6 - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1XqeIQCynEr8yoaX0qnUL7U9hGx6hDVDq?usp=drive_link"
  },
  {
    "id": "61",
    "description": "MAGICAL MIST",
    "image": "https://static.wixstatic.com/media/4f23bc_4af07b12b90949cd842ab4ea50052bae~mv2.jpg/v1/fill/w_67,h_97,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E6%AD%A3%E6%9C%BA.jpg",
    "category": Category.EFFECT_MACHINE,
    "description": "MAGICAL MIST - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1I66bClrA_xS__9LikewZ8rVeoSSOSQAy?usp=drive_link"
  },
  {
    "id": "62",
    "description": "SOLSTICE QUAD 4100IP",
    "image": "https://static.wixstatic.com/media/030325_5f554947d210414f8ee4d371d9da1b66~mv2.jpg/v1/fill/w_115,h_113,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/SPL-LED-4100IP%204.jpg",
    "category": Category.STATIC_LIGHTS,
    "description": "SOLSTICE QUAD 4100IP - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/11zIU-qf_Mz07Npu9B2POQx1qOGL_CcrM?usp=drive_link"
  },
  {
    "id": "66",
    "description": "SOLSTICE 616HEX",
    "image": "https://static.wixstatic.com/media/4f23bc_8cabcee38bf945068b958131b40e3f36~mv2.jpg/v1/crop/x_854,y_372,w_4027,h_3980/fill/w_115,h_113,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E6%AD%A3.jpg",
    "category": Category.STATIC_LIGHTS,
    "description": "SOLSTICE 616HEX - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1ob3IjeUg1f52h7ead3mnApPrLa9JlHv2?usp=drive_link"
  },
  {
    "id": "67",
    "description": "LIMONA UPLIGHT 618",
    "image": "https://static.wixstatic.com/media/4f23bc_c6c383fce7ae43f4a4e004af68e87ffa~mv2.jpg/v1/crop/x_1039,y_242,w_3397,h_3357/fill/w_115,h_113,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/5.jpg",
    "category": Category.STATIC_LIGHTS,
    "description": "LIMONA UPLIGHT 618 - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1raDay0bsgODGWlu1BcOjE6kGv3LsIPBx?usp=drive_link"
  },
  {
    "id": "68",
    "description": "LIMONA 1815L IP",
    "image": "https://static.wixstatic.com/media/4f23bc_87e2b859bdf74ac6957c27bf4dbce5e6~mv2.jpg/v1/crop/x_1158,y_585,w_3486,h_3445/fill/w_115,h_113,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/SPL-LED-1815L%20IP%E6%AD%A3.jpg",
    "category": Category.STATIC_LIGHTS,
    "description": "LIMONA 1815L IP - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1iHOUGonx2cYgL2DWqEZl-IftPVL-MPMi?usp=drive_link"
  },
  {
    "id": "69",
    "description": "LIMONA PAR L2415 IP (RGBLA-UV)",
    "image": "https://static.wixstatic.com/media/4f23bc_90dae03585154855bc758d64b86f62f3~mv2.jpg/v1/crop/x_1140,y_209,w_3980,h_3933/fill/w_115,h_113,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E6%AD%A3.jpg",
    "category": Category.STATIC_LIGHTS,
    "description": "LIMONA PAR L2415 IP (RGBLA-UV) - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/13ydRNiy5FXfDm6TnIkhPhG4tHCg6AzMZ?usp=drive_link"
  },
  {
    "id": "70",
    "description": "HUEWAVE PL 910IP",
    "image": "https://static.wixstatic.com/media/030325_3a63de18698f4ea59edc035addb62513~mv2.jpg/v1/fill/w_115,h_113,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/SPL-LED-910%20IP1_edited.jpg",
    "category": Category.STATIC_LIGHTS,
    "description": "HUEWAVE PL 910IP - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1qCY95eF7-QMEF_9Fjm80p8WohDelELk6?usp=drive_link"
  },
  {
    "id": "71",
    "description": "HUEWAVE PL 1210",
    "image": "https://static.wixstatic.com/media/030325_81187ffb94c943b98430aeb1dadf85ce~mv2.jpg/v1/fill/w_115,h_113,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/SPL-LED-12101_edited.jpg",
    "category": Category.STATIC_LIGHTS,
    "description": "HUEWAVE PL 1210 - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1MCEUDPlGYLHTNY8bZg7Q3YlQoMsBekZf?usp=drive_link"
  },
  {
    "id": "72",
    "description": "HUEWAVE PL 1810",
    "image": "https://static.wixstatic.com/media/4f23bc_bc259a59cd3846c6a6d89bf3ec319f4e~mv2.jpg/v1/crop/x_1186,y_293,w_3099,h_3062/fill/w_115,h_113,fp_0.35_0.59,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E6%AD%A3.jpg",
    "category": Category.STATIC_LIGHTS,
    "description": "HUEWAVE PL 1810 - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1EMfdX8W73pUFtFuRwKaJ19aqQhcWBDdH?usp=drive_link"
  },
  {
    "id": "73",
    "description": "HUEWAVE PL 1810IP",
    "image": "https://static.wixstatic.com/media/4f23bc_16d76155313d440591402c680f090a20~mv2.jpg/v1/crop/x_1132,y_239,w_3209,h_3170/fill/w_115,h_113,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E6%AD%A3_JPG.jpg",
    "category": Category.STATIC_LIGHTS,
    "description": "HUEWAVE PL 1810IP - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/10OLoEN6jXOlhTJoNeWvebuSv3_edLYfp?usp=drive_link"
  },
  {
    "id": "74",
    "description": "DUALTONE PAR L450",
    "image": "https://static.wixstatic.com/media/4f23bc_991272a3ae9c4595b2eafa4a4d715e13~mv2.jpg/v1/crop/x_1690,y_969,w_2981,h_2946/fill/w_115,h_113,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E6%AD%A3.jpg",
    "category": Category.STATIC_LIGHTS,
    "description": "DUALTONE PAR L450 - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1lLX4MsvEbfTO34p5R7DiZ9nuts5rPLYc?usp=drive_link"
  },
  {
    "id": "75",
    "description": "DUALTONE PAR L750",
    "image": "https://static.wixstatic.com/media/030325_46b4627d8fbe442fa64ab58d337c6088~mv2.jpg/v1/fill/w_126,h_124,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/SPL-LED-P750%201_edited.jpg",
    "category": Category.STATIC_LIGHTS,
    "description": "DUALTONE PAR L750 - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1zLV5JqQy9XJuaRz26Q10RuqKUN0FA4Rr?usp=drive_link"
  },
  {
    "id": "76",
    "description": "HUEWAVE PL 2410IP",
    "image": "https://static.wixstatic.com/media/4f23bc_e9e30e2603b3422aa50bdb46aabc2cd3~mv2.jpg/v1/crop/x_1192,y_186,w_2997,h_2961/fill/w_126,h_124,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E6%AD%A3.jpg",
    "category": Category.STATIC_LIGHTS,
    "description": "HUEWAVE PL 2410IP - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/15djbaU5U7XqhjfZRAghSCQ_BGZTfNMA0?usp=drive_link"
  },
  {
    "id": "78",
    "description": "LIMONA PAR 2415IP (RGBWA-UV)",
    "image": "https://static.wixstatic.com/media/4f23bc_90dae03585154855bc758d64b86f62f3~mv2.jpg/v1/crop/x_1571,y_473,w_3578,h_3535/fill/w_130,h_128,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E6%AD%A3.jpg",
    "category": Category.STATIC_LIGHTS,
    "description": "LIMONA PAR 2415IP (RGBWA-UV) - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1Rhuh_DqtDWanZxN2hgQz8_pQOyBY7X1l?usp=drive_link"
  },
  {
    "id": "79",
    "description": "HUEWAVE PL 363",
    "image": "https://static.wixstatic.com/media/4f23bc_6b828da988a64c2690e6091a07dd1f8d~mv2.jpg/v1/fill/w_130,h_128,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/363%E6%AD%A3_edited.jpg",
    "category": Category.STATIC_LIGHTS,
    "description": "HUEWAVE PL 363 - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1N92uXEUPLzeaMxKAMzm1H3-XNcOGq221?usp=drive_link"
  },
  {
    "id": "80",
    "description": "COLOR SPECTRUM 4410IP",
    "image": "https://static.wixstatic.com/media/4f23bc_2af2dff4ed3847808106225f4af4eedd~mv2.jpg/v1/crop/x_1021,y_467,w_3022,h_2986/fill/w_130,h_128,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/4410%E6%AD%A3.jpg",
    "category": Category.STATIC_LIGHTS,
    "description": "COLOR SPECTRUM 4410IP - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/19cnMcTPJwNondKpkC7aIz-5hJmd9v7r-?usp=drive_link"
  },
  {
    "id": "81",
    "description": "DT 200W COB",
    "image": "https://static.wixstatic.com/media/4f23bc_fb87dfcb2e07496eadeed2c0ecfabec1~mv2.jpg/v1/fill/w_130,h_128,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/200COB%E6%AD%A3_edited.jpg",
    "category": Category.STATIC_LIGHTS,
    "description": "DT 200W COB - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1TmGGUEXIRLmj6ez_5YP9cOLyXhCKJ0m4?usp=drive_link"
  },
  {
    "id": "82",
    "description": "HUEWAVE RGBW200 COB IP",
    "image": "https://static.wixstatic.com/media/4f23bc_c37ef1a3aef3452083a8298b838f7999~mv2.jpg/v1/crop/x_396,y_1196,w_2856,h_2822/fill/w_130,h_128,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E6%AD%A3.jpg",
    "category": Category.STATIC_LIGHTS,
    "description": "HUEWAVE RGBW200 COB IP - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/10v_vCpgxQG-j9FOLHjvuncPI6eUuvFUy?usp=drive_link"
  },
  {
    "id": "83",
    "description": "PULSARIS S960IP",
    "image": "https://static.wixstatic.com/media/4f23bc_62cf16f2545b4c5e9fa285b1f32b482d~mv2.png/v1/fill/w_130,h_128,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/S960IP%E6%AD%A3_edited_edited.png",
    "category": Category.STATIC_LIGHTS,
    "description": "PULSARIS S960IP - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1WGNHaHMcNTbcBTw9Q262p168Z-UUnB0k?usp=drive_link"
  },
  {
    "id": "84",
    "description": "PULSARIS 960B II",
    "image": "https://static.wixstatic.com/media/4f23bc_5231e41ca9354b118540df84f39d2733~mv2.jpg/v1/fill/w_130,h_128,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E6%AD%A32.jpg",
    "category": Category.STATIC_LIGHTS,
    "description": "PULSARIS 960B II - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1AB2kEmbnXt8dpwscZ4FbOsvM8PtFjXzD?usp=drive_link"
  },
  {
    "id": "85",
    "description": "PULSARIS 960B",
    "image": "https://static.wixstatic.com/media/4f23bc_8a8f934b780f4f129eec8854c3fe74c1~mv2.png/v1/crop/x_366,y_379,w_2269,h_2241/fill/w_130,h_128,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E6%AD%A32_edited.png",
    "category": Category.STATIC_LIGHTS,
    "description": "PULSARIS 960B - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1ddZTOiYArBVYDniZ06OV8dUC8bpoNfKd?usp=drive_link"
  },
  {
    "id": "86",
    "description": "PULSARIS BAR 720B",
    "image": "https://static.wixstatic.com/media/4f23bc_a7f219d4767f4d64ac682261a6443695~mv2.png/v1/fill/w_130,h_128,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E6%95%88%E6%9E%9C1_edited.png",
    "category": Category.STATIC_LIGHTS,
    "description": "PULSARIS BAR 720B - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1T47YD3lgQHOLlmt2r_VvC9_YB172axjd?usp=drive_link"
  },
  {
    "id": "87",
    "description": "HUEWAVE PIXEL BAR(RGBLA-UV)",
    "image": "https://static.wixstatic.com/media/4f23bc_27b8f14d729a47d9b164b3c13c9824fe~mv2.png/v1/fill/w_130,h_128,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/1810R%E6%AD%A31_edited.png",
    "category": Category.STATIC_LIGHTS,
    "description": "HUEWAVE PIXEL BAR(RGBLA-UV) - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/15X3hbSZG9oSVtmyb6etRb9yJ6bp2vUUM?usp=drive_link"
  },
  {
    "id": "88",
    "description": "HUEWAVE PIXEL BAR (RGBWA-UV)",
    "image": "https://static.wixstatic.com/media/4f23bc_b0fcdda694384b74bd87a251ae66399a~mv2.png/v1/fill/w_130,h_128,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/1810R%E6%AD%A31_edited.png",
    "category": Category.STATIC_LIGHTS,
    "description": "HUEWAVE PIXEL BAR (RGBWA-UV) - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1M4sN9SbCKg3bo0EOzmj9xD_IdudXfiTn?usp=drive_link"
  },
  {
    "id": "89",
    "description": "HUEWAVE PIXEL BAR IP",
    "image": "https://static.wixstatic.com/media/4f23bc_262d87699ce44d9aaa631e35f3e2b975~mv2.png/v1/fill/w_130,h_128,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/1810R%20IP%E6%AD%A31_edited.png",
    "category": Category.STATIC_LIGHTS,
    "description": "HUEWAVE PIXEL BAR IP - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1B-VORGUsysYu6xHE8uNDLXGYXtJuHqiu?usp=drive_link"
  },
  {
    "id": "90",
    "description": "COLOR SPECTRUM STROBE T3240",
    "image": "https://static.wixstatic.com/media/4f23bc_4838e4d52af74cf79fd515745d3d269b~mv2.jpg/v1/fill/w_130,h_128,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/3240%E6%AD%A3.jpg",
    "category": Category.STATIC_LIGHTS,
    "description": "COLOR SPECTRUM STROBE T3240 - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1mSZwfudTUhbPkj76JzxKj3yjf-Xqcfji?usp=drive_link"
  },
  {
    "id": "91",
    "description": "VERSATILIS PROFILE 800",
    "image": "https://static.wixstatic.com/media/4f23bc_93032e1c847b49e39d93df526d21603f~mv2.jpg/v1/crop/x_716,y_221,w_3390,h_3390/fill/w_132,h_132,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/800%E6%AD%A31.jpg",
    "category": Category.AUTOMATIC_LIGHTS,
    "description": "VERSATILIS PROFILE 800 - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1egpEE6W0bEiondt-gfSG_qtvNIo5PsP6?usp=drive_link"
  },
  {
    "id": "92",
    "description": "VERSATILIS BSWF700",
    "image": "https://static.wixstatic.com/media/4f23bc_59bec0a9e1fc4fc8acaddc36e79d5bef~mv2.jpg/v1/crop/x_64,y_62,w_583,h_583/fill/w_132,h_132,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/700bswf.jpg",
    "category": Category.AUTOMATIC_LIGHTS,
    "description": "VERSATILIS BSWF700 - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1NrCU9_7S-s26SBjPoa-1tZdvUhamqVxW?usp=drive_link"
  },
  {
    "id": "93",
    "description": "SPOTTY LED 90",
    "image": "https://static.wixstatic.com/media/4f23bc_fa9c9de21a6f4e5aab18cc1d9bd69109~mv2.jpg/v1/crop/x_326,y_325,w_2474,h_2474/fill/w_132,h_132,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E6%AD%A35.jpg",
    "category": Category.AUTOMATIC_LIGHTS,
    "description": "SPOTTY LED 90 - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1NiqRI7p3q6fuwKv9fK4rx0y2pIeUnVOu?usp=drive_link"
  },
  {
    "id": "94",
    "description": "JUBARIS BEAM L90",
    "image": "https://static.wixstatic.com/media/4f23bc_d761c25e3e184483af66ac841d2b3514~mv2.jpg/v1/crop/x_32,y_39,w_697,h_697/fill/w_132,h_132,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E6%AD%A32.jpg",
    "category": Category.AUTOMATIC_LIGHTS,
    "description": "JUBARIS BEAM L90 - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1NN--F471ElfJ48e8bye8SDEsVyMwB2QO?usp=drive_link"
  },
  {
    "id": "95",
    "description": "SERPENTINE 1260S",
    "image": "https://static.wixstatic.com/media/4f23bc_9177811aa45a426fba5caa6938ddb453~mv2.jpg/v1/fill/w_132,h_132,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/1260s.jpg",
    "category": Category.AUTOMATIC_LIGHTS,
    "description": "SERPENTINE 1260S - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1BfWtI-QPnYq3ChrLcVp5C3A8mfW_2JgC?usp=drive_link"
  },
  {
    "id": "96",
    "description": "STUDIO LUX FRESNEL 400",
    "image": "https://static.wixstatic.com/media/4f23bc_bd6492c8a38d4bffb7d62492fbcb167d~mv2.jpg/v1/fill/w_135,h_133,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E6%AD%A33.jpg",
    "category": Category.TV_STUDIO,
    "description": "STUDIO LUX FRESNEL 400 - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/18BLRmB-a_WCo0rF1ZkVwD-XblVt2Otvr?usp=drive_link"
  },
  {
    "id": "97",
    "description": "STUDIO LUX 1600",
    "image": "https://static.wixstatic.com/media/4f23bc_793a50e8fba24acfb76825495c40f111~mv2.jpg/v1/fill/w_135,h_133,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E6%AD%A35.jpg",
    "category": Category.TV_STUDIO,
    "description": "STUDIO LUX FRESNEL 400 - Professional lighting equipment",
    "video": "",
    "manual": "https://drive.google.com/drive/folders/1FBvhZ-k7LNoCiv3qk4SmCEXbgbc7JAda?usp=drive_link"
  }

];
