import { useState} from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { useRef } from 'react';
import './App.css';
import Card from "./Card";
import styled from 'styled-components';
import logo from "./assets/logo.png"
import styles from "./nav.module.css";
import hamburger from "./assets/hamburger.png";
import Hamburger from "./HamburgerMenu";
import s from "./card.module.css";
import Headphones from "./Headphones.jsx";
import emailjs from '@emailjs/browser';


const NewA = styled.a `
padding : 1.5rem;

@media(max-width: 950px){
  display: none;
}


`
const cardData = [
  { id: 1, price:"33.99",  title: 'PowerLocus Bluetooth Headphones Over Ear, 40H Playtime with 4 EQ Modes, Wireless Headphones with Microphone, Hi-Fi Stereo Foldable Headset, FM Radio, Micro SD/TF, Deep Bass for Travel/PC/Cell Phones', content: 'Content for Card 1' , img:"https://m.media-amazon.com/images/I/71HZq1cT6DL._AC_SX425_.jpg",},
  { id: 2, price:"128",  title: 'Sony INZONE H3 Wired Gaming Headset, Over-Ear Headphones with 360 Spatial Sound, MDR-G300', content: 'Content for Card 2' , img:"https://m.media-amazon.com/images/I/41HMwroOuNL.__AC_SX300_SY300_QL70_ML2_.jpg",},
  { id: 3, price:"248",  title: 'Sony WH-CH720N Noise Cancelling Wireless Headphones Bluetooth Over The Ear Headset with Microphone and Alexa Voice Control, Black', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/51rpbVmi9XL.__AC_SX300_SY300_QL70_ML2_.jpg", },
  { id: 4, price:"34.99",  title: 'Bluetooth Headphones Over-Ear, PowerLocus Wireless Headphones, Hi-Fi Stereo Deep Bass, Soft Earmuffs Foldable Headphone with Built-in Microphone, Wireless and Wired Headset for Cell Phones,Tablets, PC', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/51YIf5qKnnL.__AC_SY300_SX300_QL70_ML2_.jpg", },
  { id: 5, price:"128",  title: 'Sony WF-C700N Truly Wireless Noise Cancelling in-Ear Bluetooth Earbud Headphones with Mic and IPX4 Water Resistance, Black', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/41l+GRy9UsL._AC_SY450_.jpg", },
  { id: 6, price:"65.45",  title: 'Skullcandy Grind Fuel In-Ear Wireless Earbuds with Wireless Charging, 40 Hr Battery, Skull-iQ, Alexa Enabled, Microphone, Works with iPhone Android and Bluetooth Devices - True Black/Orange', img:"https://m.media-amazon.com/images/I/61KSOiRVJOL.__AC_SX300_SY300_QL70_ML2_.jpg", },
  { id: 7, price:"59.46",  title: 'Jam Live Loud Truly Wireless Earbuds | Bluetooth 5.0 | Workout Ready IPX4 Rated, 3 Hour Playtime - 12 with Charging Case', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/51XsTx6OMbL.__AC_SY300_SX300_QL70_ML2_.jpg", },
  { id: 8, price:"31.98",  title: 'Wireless Earbuds, Bluetooth 5.3 Headphones 88Hrs Play Time with 1800mAh Charging Case in-Ear Stereo Earphones,Cell Phones Charging Function, IPX7 Waterproof Earphone for Phone Sports', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/51CgqDiBDWL.__AC_SX300_SY300_QL70_ML2_.jpg", },
  { id: 9, price:"39.99",  title: 'soundcore by Anker P20i True Wireless Earbuds, 10mm Drivers with Big Bass, Bluetooth 5.3, 30H Long Playtime, IPX5 Water-Resistant, 2 Mics for AI Clear Calls, 22 Preset EQs, Customization via App', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/51TUtS0sRSL.__AC_SX300_SY300_QL70_ML2_.jpg", },
  { id: 10, price:"149.99",  title: 'KOORUI 24 Inch Computer Monitor -FHD 1080P Gaming Monitor 165Hz VA 1ms 1800R LED Monitors with Ultra-Thin, HDMI X2 /DP, VESA Compatible, Tilt Adjustable, Eye Care', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/71hblCTcMVL.__AC_SX300_SY300_QL70_ML2_.jpg", },
  { id: 11, price:"279",  title: 'Acer Nitro ED270R MBMIIPHX 27" FHD 1500R Curve PC Gaming Monitor (1920 x 1080), 165Hz, Black, 27-inch', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/71pxlYugWjL.__AC_SY300_SX300_QL70_ML2_.jpg", },
  { id: 12, price:"216.10",  title: 'ViewSonic VX2718-P-MHD 27 Inch Frameless Full HD 1080p 165Hz 1ms Gaming Monitor with Adaptive-Sync Eye Care HDMI and Display Port', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/81Duq9UVJtL.__AC_SY300_SX300_QL70_ML2_.jpg", },
  { id: 13, price:"449.99",  title: 'GIGABYTE G34WQC A 34" 144Hz Ultra-Wide Curved Gaming Monitor, 3440 x 1440 VA 1500R, 1ms (MPRT) Response Time, 90% DCI-P3, VESA Display HDR400, FreeSync Premium, Black (G34WQC A-SA)', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/71hvdURMrWL.__AC_SY300_SX300_QL70_ML2_.jpg", },
  { id: 14, price:"328",  title: 'SAMSUNG  32-Inch 4K UHD Black 60 Hz High Resolution Computer Monitor with Display Port, Eye Saver/Flicker Free Mode, FreeSync - (LU32J590UQNXZA) [Canada version]', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/81Duq9UVJtL._AC_SX355_.jpg", },
  { id: 15, price:"323.99",  title: 'AOC C32G2 32" Curved Gaming Monitor, Black', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/71-Eii5frdL.__AC_SX300_SY300_QL70_ML2_.jpg", },
  { id: 16, price:"14.44",  title: 'INIU USB C Cable, [3 Pack] 3.1A QC 3.0 Fast Charging Type C Cable, [1.6+6.6+6.6ft] Nylon Braided USB A to USB C Phone Data Cord for iPhone 15 Pro Max Samsung S21 S20 S10 Note 10 etc', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/71Q-pCG03lS._AC_SY450_.jpg", },
  { id: 17, price:"9.99",  title: 'Basesailor USB to USB C Adapter 3Pack,Type C Female to USB A Male Charger Converter for Apple iWatch Watch 7 8 9 SE,iPhone 12 13 14 15 Plus Max,Car Play,Airpods,iPad Air 4 5 Mini 6,Galaxy S23 S21 S22', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/616MgHgb-GL._AC_SY550_.jpg", },
  { id: 18, price:"12.13",  title: 'SanDisk 128GB Ultra MicroSDXC UHS-I Memory Card with Adapter - 120MB/s, C10, U1, Full HD, A1, Micro SD Card - SDSQUA4-128G-GN6MA', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/61jhzv9AQRL.__AC_SY300_SX300_QL70_ML2_.jpg", },
  { id: 19, price:"18.27",  title: 'SanDisk Ultra Flair USB 3.0 128GB Flash Drive High Performance up to 150MB/s (SDCZ73-128G-G46), Black, Silver', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/61ZqqUStIsL._AC_SX355_.jpg", },
  { id:20, price:"17.99",  title: 'Aceele USB Hub 3.0 Splitter with 4ft Extension Long Cable Cord, 4-Port Extra Slim Multiport Expander for Desktop Computer PC, PS4, Laptop, Chromebook, Surface Pro 3, iMac, Flash Drive Data and More', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/41xNP25vDrL._SY445_SX342_QL70_ML2_.jpg", },
  { id: 21, price:"21.99",  title: 'Anker USB C Cable, [2-Pack, 6 ft] Type C Charger Premium Nylon USB Cable, USB A to Type C Charging Cable Fast Charge for Samsung Galaxy S10 S10+ / Note 8, LG V20 and Other USB C Charger (Black)', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/71JPX+AFszL._AC_SY300_SX300_.jpg", },
  { id: 22, price:"20.69",  title: 'BENFEI USB C HUB 7in1, USB C HUB Multiport Adapter with USB-C to HDMI, USB-C to SD/TF Card Reader/3*USB 3.0/60W Power Delivery, Compatible with iPhone 15 Pro/Max, MacBook, iPad Pro, iMac, S23, XPS17', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/71MCHskYKvL._AC_SX425_.jpg", },
  { id: 23, price:"20.50",  title: 'iPhone 15/15 Pro Max/Plus Charger, 20W Fast Charging USB C Charger Block Wall Plug Power Adapter + 6FT USB-C Cable for iPhone 15 Pro Max Plus, iPad Pro 12.9/11 inch, iPad Air 4/5, Google Pixel 8/7/6', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/71dAYcCxWLL._AC_SX425_.jpg", },
  { id: 24, price:"39.99",  title: '3 in 1 Charging Station for iPhone, Wireless Charger for iPhone 15 14 13 12 11 X Pro Max & Apple Watch - Charging Stand Dock for AirPods', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/61Kf+coz5uL._AC_SY300_SX300_.jpg", },
  { id: 25, price:"31.98",  title: 'EXW Wireless Charging Station, 3 in 1 Charging Station for Apple Devices, Wireless Charger for iPhone 15 14 13 12 11 Pro & Max Series, AirPods Pro/3/2, Apple Watch (Black)', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/71CiJybGgpL.__AC_SX300_SY300_QL70_ML2_.jpg", },
  { id: 26, price:"20.99",  title: 'INIU Wireless Charger, 15W Qi Certified Fast Wireless Charging Stand with Sleep-Friendly Adaptive Light for iPhone 15 14 13 12 11 Pro Max Plus Samsung Galaxy S23 S22 Ultra S21 S20 Note 20 Google etc.', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/71B+4V5YhnL._AC_SY300_SX300_.jpg", },
  { id: 27, price:"39.99",  title: 'Crock-Pot Electric Lunch Box, Portable Food Warmer for On-the-Go, 20-Ounce (591 mL), Moonshine Green', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/71eS9+QbGHL._AC_SY300_SX300_.jpg", },
  { id: 28, price:"92.54",  title: 'Amazon Basics Enameled Cast Iron Covered Dutch Oven, 6-Quart, Red', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/71Vax19zoHL.__AC_SY300_SX300_QL70_ML2_.jpg", },
  { id: 29, price:"26.48",  title: 'Ecolution Patented Micro-Pop Microwave Popcorn Popper with Temperature Safe Glass, 3-in-1 Lid Measures Kernels and Melts Butter, Made Without BPA, Dishwasher Safe, 3-Quart, Aqua', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/710PGXTh-4L.__AC_SX300_SY300_QL70_ML2_.jpg", },
  { id: 30, price:"149.99",  title: 'Aonee 2 Tier Dish Drying Rack with Drainboard, Cutlery Holder, Cutting-Board/Cup Holder and 3 Hooks for Kitchen Counter, Rust-Proof Large Dish Drainer, Black', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/71cyLA8hhgL.__AC_SX300_SY300_QL70_ML2_.jpg", },
  { id: 31, price:"21.98",  title: 'BLACK+DECKER 2-Slice Extra Wide Slot Toaster, Classic Oval, Black with Stainless Steel Accents, TR1278B', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/8159xjkhHOL.__AC_SX300_SY300_QL70_ML2_.jpg", },
  { id: 32, price:"58",  title: 'Keurig K-Mini Single Serve K-Cup Pod Coffee Maker, Made From At Least 20% Recycled Plastic, Matte Black', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/61E34lIQKBL.__AC_SX300_SY300_QL70_ML2_.jpg", },
  { id: 33, price:"25.19",  title: 'TINDTOP Vegetable Chopper and Slicer Dicer for Kitchen, 12 in 1 Onion Chopper Potato Cutter Food Chopper Veggie Chopper Salad Maker Dicing Machine Potato Fruit Chopper with Container', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/71Lx5tOeQPL.__AC_SX300_SY300_QL70_ML2_.jpg", },
];

const headphonesData = [
  { id: 1, price:"33.99",  title: 'PowerLocus Bluetooth Headphones Over Ear, 40H Playtime with 4 EQ Modes, Wireless Headphones with Microphone, Hi-Fi Stereo Foldable Headset, FM Radio, Micro SD/TF, Deep Bass for Travel/PC/Cell Phones', content: 'Content for Card 1' , img:"https://m.media-amazon.com/images/I/71HZq1cT6DL._AC_SX425_.jpg",},
  { id: 2, price:"128",  title: 'Sony INZONE H3 Wired Gaming Headset, Over-Ear Headphones with 360 Spatial Sound, MDR-G300', content: 'Content for Card 2' , img:"https://m.media-amazon.com/images/I/41HMwroOuNL.__AC_SX300_SY300_QL70_ML2_.jpg",},
  { id: 3, price:"248",  title: 'Sony WH-CH720N Noise Cancelling Wireless Headphones Bluetooth Over The Ear Headset with Microphone and Alexa Voice Control, Black', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/51rpbVmi9XL.__AC_SX300_SY300_QL70_ML2_.jpg", },
  { id: 4, price:"34.99",  title: 'Bluetooth Headphones Over-Ear, PowerLocus Wireless Headphones, Hi-Fi Stereo Deep Bass, Soft Earmuffs Foldable Headphone with Built-in Microphone, Wireless and Wired Headset for Cell Phones,Tablets, PC', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/51YIf5qKnnL.__AC_SY300_SX300_QL70_ML2_.jpg", },
  
];

const airpodData = [
  { id: 5, price:"128",  title: 'Sony WF-C700N Truly Wireless Noise Cancelling in-Ear Bluetooth Earbud Headphones with Mic and IPX4 Water Resistance, Black', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/41l+GRy9UsL._AC_SY450_.jpg", },
  { id: 6, price:"65.45",  title: 'Skullcandy Grind Fuel In-Ear Wireless Earbuds with Wireless Charging, 40 Hr Battery, Skull-iQ, Alexa Enabled, Microphone, Works with iPhone Android and Bluetooth Devices - True Black/Orange', img:"https://m.media-amazon.com/images/I/61KSOiRVJOL.__AC_SX300_SY300_QL70_ML2_.jpg", },
  { id: 7, price:"59.46",  title: 'Jam Live Loud Truly Wireless Earbuds | Bluetooth 5.0 | Workout Ready IPX4 Rated, 3 Hour Playtime - 12 with Charging Case', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/51XsTx6OMbL.__AC_SY300_SX300_QL70_ML2_.jpg", },
  { id: 8, price:"31.98",  title: 'Wireless Earbuds, Bluetooth 5.3 Headphones 88Hrs Play Time with 1800mAh Charging Case in-Ear Stereo Earphones,Cell Phones Charging Function, IPX7 Waterproof Earphone for Phone Sports', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/51CgqDiBDWL.__AC_SX300_SY300_QL70_ML2_.jpg", },
  { id: 9, price:"39.99",  title: 'soundcore by Anker P20i True Wireless Earbuds, 10mm Drivers with Big Bass, Bluetooth 5.3, 30H Long Playtime, IPX5 Water-Resistant, 2 Mics for AI Clear Calls, 22 Preset EQs, Customization via App', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/51TUtS0sRSL.__AC_SX300_SY300_QL70_ML2_.jpg", },
]

const monitorData = [
  { id: 10, price:"149.99",  title: 'KOORUI 24 Inch Computer Monitor -FHD 1080P Gaming Monitor 165Hz VA 1ms 1800R LED Monitors with Ultra-Thin, HDMI X2 /DP, VESA Compatible, Tilt Adjustable, Eye Care', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/71hblCTcMVL.__AC_SX300_SY300_QL70_ML2_.jpg", },
  { id: 11, price:"279",  title: 'Acer Nitro ED270R MBMIIPHX 27" FHD 1500R Curve PC Gaming Monitor (1920 x 1080), 165Hz, Black, 27-inch', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/71pxlYugWjL.__AC_SY300_SX300_QL70_ML2_.jpg", },
  { id: 12, price:"216.10",  title: 'ViewSonic VX2718-P-MHD 27 Inch Frameless Full HD 1080p 165Hz 1ms Gaming Monitor with Adaptive-Sync Eye Care HDMI and Display Port', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/81Duq9UVJtL.__AC_SY300_SX300_QL70_ML2_.jpg", },
  { id: 13, price:"449.99",  title: 'GIGABYTE G34WQC A 34" 144Hz Ultra-Wide Curved Gaming Monitor, 3440 x 1440 VA 1500R, 1ms (MPRT) Response Time, 90% DCI-P3, VESA Display HDR400, FreeSync Premium, Black (G34WQC A-SA)', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/71hvdURMrWL.__AC_SY300_SX300_QL70_ML2_.jpg", },
  { id: 14, price:"328",  title: 'SAMSUNG  32-Inch 4K UHD Black 60 Hz High Resolution Computer Monitor with Display Port, Eye Saver/Flicker Free Mode, FreeSync - (LU32J590UQNXZA) [Canada version]', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/81Duq9UVJtL._AC_SX355_.jpg", },
  { id: 15, price:"323.99",  title: 'AOC C32G2 32" Curved Gaming Monitor, Black', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/71-Eii5frdL.__AC_SX300_SY300_QL70_ML2_.jpg", },
]

const accessorieData = [
  { id: 16, price:"14.44",  title: 'INIU USB C Cable, [3 Pack] 3.1A QC 3.0 Fast Charging Type C Cable, [1.6+6.6+6.6ft] Nylon Braided USB A to USB C Phone Data Cord for iPhone 15 Pro Max Samsung S21 S20 S10 Note 10 etc', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/71Q-pCG03lS._AC_SY450_.jpg", },
  { id: 17, price:"9.99",  title: 'Basesailor USB to USB C Adapter 3Pack,Type C Female to USB A Male Charger Converter for Apple iWatch Watch 7 8 9 SE,iPhone 12 13 14 15 Plus Max,Car Play,Airpods,iPad Air 4 5 Mini 6,Galaxy S23 S21 S22', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/616MgHgb-GL._AC_SY550_.jpg", },
  { id: 18, price:"12.13",  title: 'SanDisk 128GB Ultra MicroSDXC UHS-I Memory Card with Adapter - 120MB/s, C10, U1, Full HD, A1, Micro SD Card - SDSQUA4-128G-GN6MA', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/61jhzv9AQRL.__AC_SY300_SX300_QL70_ML2_.jpg", },
  { id: 19, price:"18.27",  title: 'SanDisk Ultra Flair USB 3.0 128GB Flash Drive High Performance up to 150MB/s (SDCZ73-128G-G46), Black, Silver', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/61ZqqUStIsL._AC_SX355_.jpg", },
  { id:20, price:"17.99",  title: 'Aceele USB Hub 3.0 Splitter with 4ft Extension Long Cable Cord, 4-Port Extra Slim Multiport Expander for Desktop Computer PC, PS4, Laptop, Chromebook, Surface Pro 3, iMac, Flash Drive Data and More', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/41xNP25vDrL._SY445_SX342_QL70_ML2_.jpg", },
  { id: 21, price:"21.99",  title: 'Anker USB C Cable, [2-Pack, 6 ft] Type C Charger Premium Nylon USB Cable, USB A to Type C Charging Cable Fast Charge for Samsung Galaxy S10 S10+ / Note 8, LG V20 and Other USB C Charger (Black)', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/71JPX+AFszL._AC_SY300_SX300_.jpg", },
  { id: 22, price:"20.69",  title: 'BENFEI USB C HUB 7in1, USB C HUB Multiport Adapter with USB-C to HDMI, USB-C to SD/TF Card Reader/3*USB 3.0/60W Power Delivery, Compatible with iPhone 15 Pro/Max, MacBook, iPad Pro, iMac, S23, XPS17', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/71MCHskYKvL._AC_SX425_.jpg", },
  { id: 23, price:"20.50",  title: 'iPhone 15/15 Pro Max/Plus Charger, 20W Fast Charging USB C Charger Block Wall Plug Power Adapter + 6FT USB-C Cable for iPhone 15 Pro Max Plus, iPad Pro 12.9/11 inch, iPad Air 4/5, Google Pixel 8/7/6', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/71dAYcCxWLL._AC_SX425_.jpg", },
  { id: 24, price:"39.99",  title: '3 in 1 Charging Station for iPhone, Wireless Charger for iPhone 15 14 13 12 11 X Pro Max & Apple Watch - Charging Stand Dock for AirPods', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/61Kf+coz5uL._AC_SY300_SX300_.jpg", },
  { id: 25, price:"31.98",  title: 'EXW Wireless Charging Station, 3 in 1 Charging Station for Apple Devices, Wireless Charger for iPhone 15 14 13 12 11 Pro & Max Series, AirPods Pro/3/2, Apple Watch (Black)', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/71CiJybGgpL.__AC_SX300_SY300_QL70_ML2_.jpg", },
  { id: 26, price:"20.99",  title: 'INIU Wireless Charger, 15W Qi Certified Fast Wireless Charging Stand with Sleep-Friendly Adaptive Light for iPhone 15 14 13 12 11 Pro Max Plus Samsung Galaxy S23 S22 Ultra S21 S20 Note 20 Google etc.', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/71B+4V5YhnL._AC_SY300_SX300_.jpg", },
  
]
const homeData = [
  { id: 27, price:"39.99",  title: 'Crock-Pot Electric Lunch Box, Portable Food Warmer for On-the-Go, 20-Ounce (591 mL), Moonshine Green', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/71eS9+QbGHL._AC_SY300_SX300_.jpg", },
  { id: 28, price:"92.54",  title: 'Amazon Basics Enameled Cast Iron Covered Dutch Oven, 6-Quart, Red', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/71Vax19zoHL.__AC_SY300_SX300_QL70_ML2_.jpg", },
  { id: 29, price:"26.48",  title: 'Ecolution Patented Micro-Pop Microwave Popcorn Popper with Temperature Safe Glass, 3-in-1 Lid Measures Kernels and Melts Butter, Made Without BPA, Dishwasher Safe, 3-Quart, Aqua', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/710PGXTh-4L.__AC_SX300_SY300_QL70_ML2_.jpg", },
  { id: 30, price:"149.99",  title: 'Aonee 2 Tier Dish Drying Rack with Drainboard, Cutlery Holder, Cutting-Board/Cup Holder and 3 Hooks for Kitchen Counter, Rust-Proof Large Dish Drainer, Black', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/71cyLA8hhgL.__AC_SX300_SY300_QL70_ML2_.jpg", },
  { id: 31, price:"21.98",  title: 'BLACK+DECKER 2-Slice Extra Wide Slot Toaster, Classic Oval, Black with Stainless Steel Accents, TR1278B', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/8159xjkhHOL.__AC_SX300_SY300_QL70_ML2_.jpg", },
  { id: 32, price:"58",  title: 'Keurig K-Mini Single Serve K-Cup Pod Coffee Maker, Made From At Least 20% Recycled Plastic, Matte Black', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/61E34lIQKBL.__AC_SX300_SY300_QL70_ML2_.jpg", },
  { id: 33, price:"25.19",  title: 'TINDTOP Vegetable Chopper and Slicer Dicer for Kitchen, 12 in 1 Onion Chopper Potato Cutter Food Chopper Veggie Chopper Salad Maker Dicing Machine Potato Fruit Chopper with Container', content: 'Content for Card 3', img:"https://m.media-amazon.com/images/I/71Lx5tOeQPL.__AC_SX300_SY300_QL70_ML2_.jpg", },
]

function App() {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_6n9700b', 'template_94ze3bv', form.current, 'zTf5CwtecdiU2I4ZT')
      .then((result) => {
        alert("Message Sent!")
      }, (error) => {
        alert(error.text)
      });
  };

  const[allCards , setAllCards] = useState(true);
  const[showHeadphones , setShowHeadphones] = useState(false);
  const[showAirpods , setShowAirpods] = useState(false);
  const[showMonitors , setShowMonitors] = useState(false);
  const[showAccessories , setShowAccessories] = useState(false);
  const[showHome , setShowHome] = useState(false);

  const electronicsRef = useRef(null);
  const airpodsRef = useRef(null);
  
  const [hamburgerDisplay, sethamburgerDisplay] = useState(false);

  const hamburgerMenu = () =>{
    sethamburgerDisplay(!hamburgerDisplay);
  }

  const headPhoneHandler = () =>{
    setSearchResult([]);
    setShowAccessories(false);
    setAllCards(false);
    setShowAirpods(false);
    setShowMonitors(false);
    setShowHome(false);
    setShowHeadphones(true);
    sethamburgerDisplay(!hamburgerDisplay)

  }

  const airpodHandler = () =>{
    setSearchResult([]);
    setShowAccessories(false);
    setAllCards(false);
    setShowAirpods(true);
    setShowMonitors(false);
    setShowHome(false);
    setShowHeadphones(false);
    sethamburgerDisplay(!hamburgerDisplay)
  }
  const monitorsHandler = () =>{
    setSearchResult([]);
    setShowAccessories(false);
    setAllCards(false);
    setShowAirpods(false);
    setShowMonitors(true);
    setShowHome(false);
    setShowHeadphones(false);
    sethamburgerDisplay(!hamburgerDisplay)
  }
  const accessoriesHandler = () =>{
    setSearchResult([]);
    setShowAccessories(true);
    setAllCards(false);
    setShowAirpods(false);
    setShowMonitors(false);
    setShowHome(false);
    setShowHeadphones(false);
    sethamburgerDisplay(!hamburgerDisplay)
  }
  
  const homeHandler = () =>{
    setSearchResult([]);
    setShowAccessories(false);
    setAllCards(false);
    setShowAirpods(false);
    setShowMonitors(false);
    setShowHome(true);
    setShowHeadphones(false);
    sethamburgerDisplay(!hamburgerDisplay)
  }

  const allhandler = () =>{
    setSearchResult([]);
    setShowAccessories(false);
    setAllCards(true);
    setShowAirpods(false);
    setShowMonitors(false);
    setShowHome(false);
    setShowHeadphones(false);
    sethamburgerDisplay(!hamburgerDisplay)
  }
// const [searchTruth, setSearchTruth] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  

  const searchHandler =  () =>{
    // setSearchTruth(true);
    const results = [];
    const searchInput = document.getElementById('searchInput');
    const searchValue = searchInput.value.toLowerCase().trim();
   const searchh =  cardData.map((card) =>{
      if(card.title.toLowerCase().trim().includes(searchValue)){
        setShowAccessories(false);
        setAllCards(false);
        setShowAirpods(false);
         setShowMonitors(false);
        setShowHome(false);
          setShowHeadphones(false);
        results.push(card);
        setSearchResult(results);
        
        
        
      }
      
    })
    console.log(searchResult.length)
  }


  

  const [showContactUs, setShowContactUs] = useState(false);

  const contactUsHandler = ( ) =>{
    setShowContactUs(!showContactUs);
  }

  const scrollToContact = () => {
    // Find the element by ID
    const element = document.getElementById('contactp');

    // Scroll to the element
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

const scrollAndShowForm = () =>{
  contactUsHandler();
  scrollToContact();
}



  return (
    <>
   
    <main className='h-full mx-8 font-sans' >
      <nav className='w-full h-14 flex justify-center items-center'>
         <img src={hamburger} className='h-8  mt-6 mr-16 cursor-pointer' onClick={hamburgerMenu}/>
        <div className='w-4/5 mt-6 flex items-center justify-between'>
          <div className='flex items-center'><img src={logo} className='h-10 cursor-pointer'/><p className='p-2 mr-4 text-xl font-bold '>ShopSmartPick</p></div>
          <div>
           <NewA className='cursor-pointer'><a href='#main'>Home</a></NewA>
           <NewA className='cursor-pointer' onClick={scrollAndShowForm}>Contact us</NewA>
          </div>
          <div className='flex items-center' id='main'>
            <input placeholder='Search ShopSmartPick' className={styles.searchBar} id='searchInput'></input>
            <button className='bg-gray-800 text-white p-1 rounded h-2/5 ' onClick={searchHandler}>Search</button>
          </div>
        </div>
      </nav>
      {
        hamburgerDisplay ? (
          <Hamburger onHeadphoneMenu ={headPhoneHandler} onAirpodsMenu={airpodHandler} onMonitorsMenu={monitorsHandler} onAccessoriesMenu={accessoriesHandler} onHomeMenu={homeHandler} onAllMenu={allhandler}></Hamburger>
        ) : (null)
      }
 
      <div className={`mt-40   ${s.cardDiv}`}>
          {
            allCards && (
              cardData.map((card) => (
                <Card key={card.id} price={card.price} title={card.title} content={card.content} img ={card.img} ></Card>
              ))
            )
          }

          {
            showHeadphones && (
              headphonesData.map((card) => (
                <Card key={card.id} price={card.price} title={card.title} content={card.content} img ={card.img} ></Card>
              ))
            )
          }

          {
            showAirpods && (
              airpodData.map((card) => (
                <Card key={card.id} price={card.price} title={card.title} content={card.content} img ={card.img} ></Card>
              ))
            )
          }

          {
            showMonitors && (
              monitorData.map((card) => (
                <Card key={card.id} price={card.price} title={card.title} content={card.content} img ={card.img} ></Card>
              ))
            )
          }

          {
            showAccessories && (
              accessorieData.map((card) => (
                <Card key={card.id} price={card.price} title={card.title} content={card.content} img ={card.img} ></Card>
              ))
            )
          }

          {
            showHome && (
              homeData.map((card) => (
                <Card key={card.id} price={card.price} title={card.title} content={card.content} img ={card.img} ></Card>
              ))
            )
          }

          {
            searchResult.length>0 && <p className=''>Found {searchResult.length} results</p>
          }

          {
            searchResult.length >0 ? ( 
              searchResult.map((card) =>{
                
                return(
                  <>
                  
                  <Card key={card.id} price={card.price} title={card.title} content={card.content} img ={card.img} ></Card>
                  </>
                )
                // console.log(
                //   card.title
                // )
              })
            ) :(null)
              
          }


      </div>

      {
        showContactUs && (
          <div className=' flex justify-center my-20  ' id='Contact'>
      <form className=' p-11  shadow-2xl rounded-2xl w-full lg:w-3/6 md:w-3/6'ref={form} onSubmit={sendEmail} >
          <h2 className='text-lg '>Send me a message</h2>
          <div className='mt-10 w-full relative'>
            <input type='text' name="user_name" className='w-full  py-2.5 px-0 text-md my-2.5 mx-0 focus:border-b border-b border-black' required="required" placeholder='What is your name?'></input>
          </div>
          <div className='mt-10 w-full relative'>
            <input type='text'name="user_email" className='w-full py-2.5 px-0 text-md my-2.5 mx-0 focus:border-none border-b border-black' required="required" placeholder='What is your Email?'></input>
          </div>
          <div className='mt-10 w-full relative'>
            <textarea name="message" className='w-full py-2.5 px-0 text-md my-2.5 mx-0 focus:border-b border-b border-black' placeholder='Your Message'></textarea>
          </div>
          <div className='flex justify-center'><input type="submit" value="Send" className='w-20 h-10 rounded-lg bg-gradient-to-r from-gray-500 to-gray-300  text-white hover:transform hover:scale-110 transition-transform duration-300 ease-in-out center cursor-pointer mt-4'/></div>
        </form>
      </div>
        )
      }
      

      
    </main>
    <footer className='w-full  mt-40 border-2'>
    <div className='w-full p-4 '>
      <p className=' text-lg font-bold '>ShopSmartPick</p>
      <p className=' text-md mt-2 cursor-pointer'>About Us</p>
      
      <p className=' text-md mt-2 cursor-pointer' onClick={contactUsHandler} >Contact Me</p>
      <p className=' text-sm mt-2 cursor-pointer text-gray-400 '>Copyright 2024 ShopSmartPick. All rights reserved</p>
    </div>
  </footer>
  </>
  )
}

export default App
