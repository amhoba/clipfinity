'use client';

import { useState, useRef, useEffect } from 'react';
import { Heart, Play, Pause, User, X, ChevronUp } from 'lucide-react';
import SimpleSpinner from '@/components/misc/simplespinner';

interface Video {
  id: string;
  src: string;
  description: string;
  likes: number;
  views: number;
  liked: boolean;
}

// Sample video data with CC vertical videos
const sampleVideos: Video[] = [
  {
    id: '1',
    src: 'http://127.0.0.1:8080/Pixar_Dog_and_Cat_s_Rainy_Dash.mp4',
    description:
      "Big Buck Bunny\n" +
      "Join a gentle giant rabbit as he stands up to three mischievous rodents in a peaceful forest.\n" +
      "This short film is a vibrant tale of friendship, courage, and comedic revenge.\n" +
      "With lush animation and charming characters, it's a delightful watch for all ages.\n" +
      "Experience the heartwarming journey that proves even the kindest creatures can be brave.\n" +
      "Join a gentle giant rabbit as he stands up to three mischievous rodents in a peaceful forest.\n" +
      "This short film is a vibrant tale of friendship, courage, and comedic revenge.\n" +
      "With lush animation and charming characters, it's a delightful watch for all ages.\n" +
      "Experience the heartwarming journey that proves even the kindest creatures can be brave.\n" +
      "Join a gentle giant rabbit as he stands up to three mischievous rodents in a peaceful forest.\n" +
      "This short film is a vibrant tale of friendship, courage, and comedic revenge.\n" +
      "With lush animation and charming characters, it's a delightful watch for all ages.\n" +
      "Experience the heartwarming journey that proves even the kindest creatures can be brave.\n" +
      "Join a gentle giant rabbit as he stands up to three mischievous rodents in a peaceful forest.\n" +
      "This short film is a vibrant tale of friendship, courage, and comedic revenge.\n" +
      "With lush animation and charming characters, it's a delightful watch for all ages.\n" +
      "Experience the heartwarming journey that proves even the kindest creatures can be brave.\n" +
      "Join a gentle giant rabbit as he stands up to three mischievous rodents in a peaceful forest.\n" +
      "This short film is a vibrant tale of friendship, courage, and comedic revenge.\n" +
      "With lush animation and charming characters, it's a delightful watch for all ages.\n" +
      "Experience the heartwarming journey that proves even the kindest creatures can be brave.\n" +
      "Join a gentle giant rabbit as he stands up to three mischievous rodents in a peaceful forest.\n" +
      "This short film is a vibrant tale of friendship, courage, and comedic revenge.\n" +
      "With lush animation and charming characters, it's a delightful watch for all ages.\n" +
      "Experience the heartwarming journey that proves even the kindest creatures can be brave.\n" +
      "Join a gentle giant rabbit as he stands up to three mischievous rodents in a peaceful forest.\n" +
      "This short film is a vibrant tale of friendship, courage, and comedic revenge.\n" +
      "With lush animation and charming characters, it's a delightful watch for all ages.\n" +
      "Experience the heartwarming journey that proves even the kindest creatures can be brave.\n" +
      "Join a gentle giant rabbit as he stands up to three mischievous rodents in a peaceful forest.\n" +
      "This short film is a vibrant tale of friendship, courage, and comedic revenge.\n" +
      "With lush animation and charming characters, it's a delightful watch for all ages.\n" +
      "Experience the heartwarming journey that proves even the kindest creatures can be brave.\n" +
      "Join a gentle giant rabbit as he stands up to three mischievous rodents in a peaceful forest.\n" +
      "This short film is a vibrant tale of friendship, courage, and comedic revenge.\n" +
      "With lush animation and charming characters, it's a delightful watch for all ages.\n" +
      "Experience the heartwarming journey that proves even the kindest creatures can be brave.\n" +
      "Join a gentle giant rabbit as he stands up to three mischievous rodents in a peaceful forest.\n" +
      "This short film is a vibrant tale of friendship, courage, and comedic revenge.\n" +
      "With lush animation and charming characters, it's a delightful watch for all ages.\n" +
      "Experience the heartwarming journey that proves even the kindest creatures can be brave.\n" +
      "Join a gentle giant rabbit as he stands up to three mischievous rodents in a peaceful forest.\n" +
      "This short film is a vibrant tale of friendship, courage, and comedic revenge.\n" +
      "With lush animation and charming characters, it's a delightful watch for all ages.\n" +
      "Experience the heartwarming journey that proves even the kindest creatures can be brave.\n" +
      "Join a gentle giant rabbit as he stands up to three mischievous rodents in a peaceful forest.\n" +
      "This short film is a vibrant tale of friendship, courage, and comedic revenge.\n" +
      "With lush animation and charming characters, it's a delightful watch for all ages.\n" +
      "Experience the heartwarming journey that proves even the kindest creatures can be brave.\n" +
      "Join a gentle giant rabbit as he stands up to three mischievous rodents in a peaceful forest.\n" +
      "This short film is a vibrant tale of friendship, courage, and comedic revenge.\n" +
      "With lush animation and charming characters, it's a delightful watch for all ages.\n" +
      "Experience the heartwarming journey that proves even the kindest creatures can be brave.\n" +
      "Join a gentle giant rabbit as he stands up to three mischievous rodents in a peaceful forest.\n" +
      "This short film is a vibrant tale of friendship, courage, and comedic revenge.\n" +
      "With lush animation and charming characters, it's a delightful watch for all ages.\n" +
      "Experience the heartwarming journey that proves even the kindest creatures can be brave.\n" +
      "Join a gentle giant rabbit as he stands up to three mischievous rodents in a peaceful forest.\n" +
      "This short film is a vibrant tale of friendship, courage, and comedic revenge.\n" +
      "With lush animation and charming characters, it's a delightful watch for all ages.\n" +
      "Experience the heartwarming journey that proves even the kindest creatures can be brave.\n" +
      "Join a gentle giant rabbit as he stands up to three mischievous rodents in a peaceful forest.\n" +
      "This short film is a vibrant tale of friendship, courage, and comedic revenge.\n" +
      "With lush animation and charming characters, it's a delightful watch for all ages.\n" +
      "Experience the heartwarming journey that proves even the kindest creatures can be brave.\n" +
      "Join a gentle giant rabbit as he stands up to three mischievous rodents in a peaceful forest.\n" +
      "This short film is a vibrant tale of friendship, courage, and comedic revenge.\n" +
      "With lush animation and charming characters, it's a delightful watch for all ages.\n" +
      "Experience the heartwarming journey that proves even the kindest creatures can be brave.\n" +
      "Join a gentle giant rabbit as he stands up to three mischievous rodents in a peaceful forest.\n" +
      "This short film is a vibrant tale of friendship, courage, and comedic revenge.\n" +
      "With lush animation and charming characters, it's a delightful watch for all ages.\n" +
      "Experience the heartwarming journey that proves even the kindest creatures can be brave.\n" +
      "Join a gentle giant rabbit as he stands up to three mischievous rodents in a peaceful forest.\n" +
      "This short film is a vibrant tale of friendship, courage, and comedic revenge.\n" +
      "With lush animation and charming characters, it's a delightful watch for all ages.\n" +
      "Experience the heartwarming journey that proves even the kindest creatures can be brave.\n" +
      "Join a gentle giant rabbit as he stands up to three mischievous rodents in a peaceful forest.\n" +
      "This short film is a vibrant tale of friendship, courage, and comedic revenge.\n" +
      "With lush animation and charming characters, it's a delightful watch for all ages.\n" +
      "Experience the heartwarming journey that proves even the kindest creatures can be brave.\n" +
      "Join a gentle giant rabbit as he stands up to three mischievous rodents in a peaceful forest.\n" +
      "This short film is a vibrant tale of friendship, courage, and comedic revenge.\n" +
      "With lush animation and charming characters, it's a delightful watch for all ages.\n" +
      "Experience the heartwarming journey that proves even the kindest creatures can be brave.\n" +
      "Join a gentle giant rabbit as he stands up to three mischievous rodents in a peaceful forest.\n" +
      "This short film is a vibrant tale of friendship, courage, and comedic revenge.\n" +
      "With lush animation and charming characters, it's a delightful watch for all ages.\n" +
      "Experience the heartwarming journey that proves even the kindest creatures can be brave.\n" +
      "Join a gentle giant rabbit as he stands up to three mischievous rodents in a peaceful forest.\n" +
      "This short film is a vibrant tale of friendship, courage, and comedic revenge.\n" +
      "With lush animation and charming characters, it's a delightful watch for all ages.\n" +
      "Experience the heartwarming journey that proves even the kindest creatures can be brave.\n" +
      "Join a gentle giant rabbit as he stands up to three mischievous rodents in a peaceful forest.\n" +
      "This short film is a vibrant tale of friendship, courage, and comedic revenge.\n" +
      "With lush animation and charming characters, it's a delightful watch for all ages.\n" +
      "Experience the heartwarming journey that proves even the kindest creatures can be brave.\n" +
      "Perfect for fans of animated storytelling and visual humor 🐰🌳✨",
    likes: 1234,
    views: 5678,
    liked: false,
  },
  {
    id: '2',
    src: 'http://127.0.0.1:8080/Pixar_Friends_Warmth_and_Trust.mp4',
    description:
      "Elephants Dream\n" +
      "Dive into a surreal mechanical world where two men, Proog and Emo, explore a bizarre labyrinth of machines.\n" +
      "As Proog tries to explain the nature of their environment, Emo’s curiosity leads to unexpected tension.\n" +
      "This visually arresting film questions reality, control, and trust in the most imaginative ways.\n" +
      "Dive into a surreal mechanical world where two men, Proog and Emo, explore a bizarre labyrinth of machines.\n" +
      "As Proog tries to explain the nature of their environment, Emo’s curiosity leads to unexpected tension.\n" +
      "This visually arresting film questions reality, control, and trust in the most imaginative ways.\n" +
      "Dive into a surreal mechanical world where two men, Proog and Emo, explore a bizarre labyrinth of machines.\n" +
      "As Proog tries to explain the nature of their environment, Emo’s curiosity leads to unexpected tension.\n" +
      "This visually arresting film questions reality, control, and trust in the most imaginative ways.\n" +
      "Dive into a surreal mechanical world where two men, Proog and Emo, explore a bizarre labyrinth of machines.\n" +
      "As Proog tries to explain the nature of their environment, Emo’s curiosity leads to unexpected tension.\n" +
      "This visually arresting film questions reality, control, and trust in the most imaginative ways.\n" +
      "Dive into a surreal mechanical world where two men, Proog and Emo, explore a bizarre labyrinth of machines.\n" +
      "As Proog tries to explain the nature of their environment, Emo’s curiosity leads to unexpected tension.\n" +
      "This visually arresting film questions reality, control, and trust in the most imaginative ways.\n" +
      "Dive into a surreal mechanical world where two men, Proog and Emo, explore a bizarre labyrinth of machines.\n" +
      "As Proog tries to explain the nature of their environment, Emo’s curiosity leads to unexpected tension.\n" +
      "This visually arresting film questions reality, control, and trust in the most imaginative ways.\n" +
      "Dive into a surreal mechanical world where two men, Proog and Emo, explore a bizarre labyrinth of machines.\n" +
      "As Proog tries to explain the nature of their environment, Emo’s curiosity leads to unexpected tension.\n" +
      "This visually arresting film questions reality, control, and trust in the most imaginative ways.\n" +
      "Dive into a surreal mechanical world where two men, Proog and Emo, explore a bizarre labyrinth of machines.\n" +
      "As Proog tries to explain the nature of their environment, Emo’s curiosity leads to unexpected tension.\n" +
      "This visually arresting film questions reality, control, and trust in the most imaginative ways.\n" +
      "Dive into a surreal mechanical world where two men, Proog and Emo, explore a bizarre labyrinth of machines.\n" +
      "As Proog tries to explain the nature of their environment, Emo’s curiosity leads to unexpected tension.\n" +
      "This visually arresting film questions reality, control, and trust in the most imaginative ways.\n" +
      "Dive into a surreal mechanical world where two men, Proog and Emo, explore a bizarre labyrinth of machines.\n" +
      "As Proog tries to explain the nature of their environment, Emo’s curiosity leads to unexpected tension.\n" +
      "This visually arresting film questions reality, control, and trust in the most imaginative ways.\n" +
      "Dive into a surreal mechanical world where two men, Proog and Emo, explore a bizarre labyrinth of machines.\n" +
      "As Proog tries to explain the nature of their environment, Emo’s curiosity leads to unexpected tension.\n" +
      "This visually arresting film questions reality, control, and trust in the most imaginative ways.\n" +
      "Dive into a surreal mechanical world where two men, Proog and Emo, explore a bizarre labyrinth of machines.\n" +
      "As Proog tries to explain the nature of their environment, Emo’s curiosity leads to unexpected tension.\n" +
      "This visually arresting film questions reality, control, and trust in the most imaginative ways.\n" +
      "Dive into a surreal mechanical world where two men, Proog and Emo, explore a bizarre labyrinth of machines.\n" +
      "As Proog tries to explain the nature of their environment, Emo’s curiosity leads to unexpected tension.\n" +
      "This visually arresting film questions reality, control, and trust in the most imaginative ways.\n" +
      "Dive into a surreal mechanical world where two men, Proog and Emo, explore a bizarre labyrinth of machines.\n" +
      "As Proog tries to explain the nature of their environment, Emo’s curiosity leads to unexpected tension.\n" +
      "This visually arresting film questions reality, control, and trust in the most imaginative ways.\n" +
      "Dive into a surreal mechanical world where two men, Proog and Emo, explore a bizarre labyrinth of machines.\n" +
      "As Proog tries to explain the nature of their environment, Emo’s curiosity leads to unexpected tension.\n" +
      "This visually arresting film questions reality, control, and trust in the most imaginative ways.\n" +
      "Dive into a surreal mechanical world where two men, Proog and Emo, explore a bizarre labyrinth of machines.\n" +
      "As Proog tries to explain the nature of their environment, Emo’s curiosity leads to unexpected tension.\n" +
      "This visually arresting film questions reality, control, and trust in the most imaginative ways.\n" +
      "Dive into a surreal mechanical world where two men, Proog and Emo, explore a bizarre labyrinth of machines.\n" +
      "As Proog tries to explain the nature of their environment, Emo’s curiosity leads to unexpected tension.\n" +
      "This visually arresting film questions reality, control, and trust in the most imaginative ways.\n" +
      "Dive into a surreal mechanical world where two men, Proog and Emo, explore a bizarre labyrinth of machines.\n" +
      "As Proog tries to explain the nature of their environment, Emo’s curiosity leads to unexpected tension.\n" +
      "This visually arresting film questions reality, control, and trust in the most imaginative ways.\n" +
      "Dive into a surreal mechanical world where two men, Proog and Emo, explore a bizarre labyrinth of machines.\n" +
      "As Proog tries to explain the nature of their environment, Emo’s curiosity leads to unexpected tension.\n" +
      "This visually arresting film questions reality, control, and trust in the most imaginative ways.\n" +
      "Dive into a surreal mechanical world where two men, Proog and Emo, explore a bizarre labyrinth of machines.\n" +
      "As Proog tries to explain the nature of their environment, Emo’s curiosity leads to unexpected tension.\n" +
      "This visually arresting film questions reality, control, and trust in the most imaginative ways.\n" +
      "Dive into a surreal mechanical world where two men, Proog and Emo, explore a bizarre labyrinth of machines.\n" +
      "As Proog tries to explain the nature of their environment, Emo’s curiosity leads to unexpected tension.\n" +
      "This visually arresting film questions reality, control, and trust in the most imaginative ways.\n" +
      "Dive into a surreal mechanical world where two men, Proog and Emo, explore a bizarre labyrinth of machines.\n" +
      "As Proog tries to explain the nature of their environment, Emo’s curiosity leads to unexpected tension.\n" +
      "This visually arresting film questions reality, control, and trust in the most imaginative ways.\n" +
      "Dive into a surreal mechanical world where two men, Proog and Emo, explore a bizarre labyrinth of machines.\n" +
      "As Proog tries to explain the nature of their environment, Emo’s curiosity leads to unexpected tension.\n" +
      "This visually arresting film questions reality, control, and trust in the most imaginative ways.\n" +
      "Dive into a surreal mechanical world where two men, Proog and Emo, explore a bizarre labyrinth of machines.\n" +
      "As Proog tries to explain the nature of their environment, Emo’s curiosity leads to unexpected tension.\n" +
      "This visually arresting film questions reality, control, and trust in the most imaginative ways.\n" +
      "Dive into a surreal mechanical world where two men, Proog and Emo, explore a bizarre labyrinth of machines.\n" +
      "As Proog tries to explain the nature of their environment, Emo’s curiosity leads to unexpected tension.\n" +
      "This visually arresting film questions reality, control, and trust in the most imaginative ways.\n" +
      "Dive into a surreal mechanical world where two men, Proog and Emo, explore a bizarre labyrinth of machines.\n" +
      "As Proog tries to explain the nature of their environment, Emo’s curiosity leads to unexpected tension.\n" +
      "This visually arresting film questions reality, control, and trust in the most imaginative ways.\n" +
      "Dive into a surreal mechanical world where two men, Proog and Emo, explore a bizarre labyrinth of machines.\n" +
      "As Proog tries to explain the nature of their environment, Emo’s curiosity leads to unexpected tension.\n" +
      "This visually arresting film questions reality, control, and trust in the most imaginative ways.\n" +
      "Dive into a surreal mechanical world where two men, Proog and Emo, explore a bizarre labyrinth of machines.\n" +
      "As Proog tries to explain the nature of their environment, Emo’s curiosity leads to unexpected tension.\n" +
      "This visually arresting film questions reality, control, and trust in the most imaginative ways.\n" +
      "Dive into a surreal mechanical world where two men, Proog and Emo, explore a bizarre labyrinth of machines.\n" +
      "As Proog tries to explain the nature of their environment, Emo’s curiosity leads to unexpected tension.\n" +
      "This visually arresting film questions reality, control, and trust in the most imaginative ways.\n" +
      "Dive into a surreal mechanical world where two men, Proog and Emo, explore a bizarre labyrinth of machines.\n" +
      "As Proog tries to explain the nature of their environment, Emo’s curiosity leads to unexpected tension.\n" +
      "This visually arresting film questions reality, control, and trust in the most imaginative ways.\n" +
      "Dive into a surreal mechanical world where two men, Proog and Emo, explore a bizarre labyrinth of machines.\n" +
      "As Proog tries to explain the nature of their environment, Emo’s curiosity leads to unexpected tension.\n" +
      "This visually arresting film questions reality, control, and trust in the most imaginative ways.\n" +
      "Dive into a surreal mechanical world where two men, Proog and Emo, explore a bizarre labyrinth of machines.\n" +
      "As Proog tries to explain the nature of their environment, Emo’s curiosity leads to unexpected tension.\n" +
      "This visually arresting film questions reality, control, and trust in the most imaginative ways.\n" +
      "Dive into a surreal mechanical world where two men, Proog and Emo, explore a bizarre labyrinth of machines.\n" +
      "As Proog tries to explain the nature of their environment, Emo’s curiosity leads to unexpected tension.\n" +
      "This visually arresting film questions reality, control, and trust in the most imaginative ways.\n" +
      "Dive into a surreal mechanical world where two men, Proog and Emo, explore a bizarre labyrinth of machines.\n" +
      "As Proog tries to explain the nature of their environment, Emo’s curiosity leads to unexpected tension.\n" +
      "This visually arresting film questions reality, control, and trust in the most imaginative ways.\n" +
      "Dive into a surreal mechanical world where two men, Proog and Emo, explore a bizarre labyrinth of machines.\n" +
      "As Proog tries to explain the nature of their environment, Emo’s curiosity leads to unexpected tension.\n" +
      "This visually arresting film questions reality, control, and trust in the most imaginative ways.\n" +
      "Dive into a surreal mechanical world where two men, Proog and Emo, explore a bizarre labyrinth of machines.\n" +
      "As Proog tries to explain the nature of their environment, Emo’s curiosity leads to unexpected tension.\n" +
      "This visually arresting film questions reality, control, and trust in the most imaginative ways.\n" +
      "Dive into a surreal mechanical world where two men, Proog and Emo, explore a bizarre labyrinth of machines.\n" +
      "As Proog tries to explain the nature of their environment, Emo’s curiosity leads to unexpected tension.\n" +
      "This visually arresting film questions reality, control, and trust in the most imaginative ways.\n" +
      "Dive into a surreal mechanical world where two men, Proog and Emo, explore a bizarre labyrinth of machines.\n" +
      "As Proog tries to explain the nature of their environment, Emo’s curiosity leads to unexpected tension.\n" +
      "This visually arresting film questions reality, control, and trust in the most imaginative ways.\n" +
      "Dive into a surreal mechanical world where two men, Proog and Emo, explore a bizarre labyrinth of machines.\n" +
      "As Proog tries to explain the nature of their environment, Emo’s curiosity leads to unexpected tension.\n" +
      "This visually arresting film questions reality, control, and trust in the most imaginative ways.\n" +
      "A brilliant showcase of experimental 3D animation and symbolic storytelling 🐘🔧🌀",
    likes: 987,
    views: 3456,
    liked: false,
  },
  {
    id: '3',
    src: 'http://127.0.0.1:8080/Pixar_Rain_Scene_Video_Ready.mp4',
    description:
      "Sintel\n" +
      "Follow a determined young woman on a perilous quest to rescue her baby dragon.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "Set in a breathtaking fantasy realm, Sintel's journey is filled with danger, loss, and discovery.\n" +
      "Each step unveils a deeper emotional truth, culminating in a powerful, unexpected twist.\n" +
      "Stunning visuals and an evocative score bring this fantasy adventure to life.\n" +
      "A must-watch for lovers of dragons, epic tales, and strong female leads 🐉🔥🎬",
    likes: 2341,
    views: 7890,
    liked: true,
  },
  {
    id: '4',
    src: 'http://127.0.0.1:8080/Pixar_Video_Max_and_Whiskers.mp4',
    description:
      "Tears of Steel\n" +
      "A futuristic tale where high-tech meets heartbreak in a battle to save the world.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Set in a dystopian Rotterdam, a team of scientists and soldiers race against time to fix the past.\n" +
      "Combining live-action and CGI, this sci-fi short delivers cinematic scope and emotional depth.\n" +
      "Explore themes of memory, regret, and human resilience against a backdrop of robots and ruins.\n" +
      "Explosive visuals and poignant storytelling collide in this thrilling ride 🚀🤖💔",
    likes: 1876,
    views: 4321,
    liked: false,
  },
];

export default function Home() {
  const [videos, setVideos] = useState<Video[]>(sampleVideos);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [mouseStart, setMouseStart] = useState(0);
  const [mouseEnd, setMouseEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showPlayOverlay, setShowPlayOverlay] = useState(true);
  const [expandedDescription, setExpandedDescription] = useState(false);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle video play/pause on swipe
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === currentIndex) {
        if (!showPlayOverlay) {
          video.play().catch((error) =>
            console.error('Autoplay failed:', error)
          );
        }
        setIsPlaying(true)
      } else {
        video.pause();
        video.currentTime = 0; // Reset only other videos
        setExpandedDescription(false) // Also shorten the description section
      }
    });
  }, [currentIndex]);

  // Handle video play/pause on click
  useEffect(() => {
    const video = videoRefs.current[currentIndex]
    if (!video) return;

    if (!showPlayOverlay) {
      if (isPlaying) {
        video.play().catch((error) =>
          console.error('Autoplay failed:', error)
        );
      } else {
        video.pause();
      }
    }
  }, [isPlaying, showPlayOverlay]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (expandedDescription) return;

      if (e.key === 'ArrowDown' && currentIndex < videos.length - 1) {
        setCurrentIndex(prev => prev + 1);
      }
      if (e.key === 'ArrowUp' && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, videos.length, expandedDescription]);

  // Handle like button
  const handleLike = (videoId: string) => {
    setVideos(prevVideos =>
      prevVideos.map(video =>
        video.id === videoId
          ? {
            ...video,
            liked: !video.liked,
            likes: video.liked ? video.likes - 1 : video.likes + 1,
          }
          : video
      )
    );
  };

  // Handle video click (play/pause)
  const handleVideoClick = () => {
    if (expandedDescription) return;

    if (showPlayOverlay) {
      setShowPlayOverlay(false);
      setIsPlaying(true);
    } else {
      setIsPlaying(prev => !prev);
    }
  };


  // Handle touch events for swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    if (expandedDescription) return;

    setTouchStart(e.targetTouches[0].clientY);
    setTouchEnd(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (expandedDescription) return;

    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (expandedDescription) return;

    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > 50;
    const isDownSwipe = distance < -50;

    if (isUpSwipe && currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isDownSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }

    // Reset touch values
    setTouchStart(0);
    setTouchEnd(0);
  };

  // Handle mouse wheel for desktop
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();

    if (expandedDescription) return;

    const isScrollUp = e.deltaY > 0;
    const isScrollDown = e.deltaY < 0;

    if (isScrollUp && currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isScrollDown && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Format numbers (1234 -> 1.2K)
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="h-screen bg-black overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
        <div className="flex items-start justify-between p-4 text-white">
          <h1 className="text-2xl font-bold">Clipfinity</h1>
          <div className="flex flex-col space-y-2 items-end pointer-events-auto">

            {/* Add Button */}
            <button className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors cursor-pointer">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>

            {/* Profile Button */}
            <button className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors cursor-pointer">
              <User className="w-7 h-7 text-white" />
            </button>

          </div>
        </div>
      </div>

      {/* Video Container */}
      <div
        ref={containerRef}
        className="relative h-full transition-transform duration-300 ease-out touch-pan-y"
        style={{
          transform: `translateY(-${currentIndex * 100}vh)`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
      >
        {videos.map((video, index) => (
          <div
            key={video.id}
            className={`relative h-screen w-full flex items-center justify-center bg-black touch-pan-y`}
          >
            <video
              ref={el => videoRefs.current[index] = el}
              className="h-full w-full touch-pan-y"
              src={video.src}
              loop
              autoPlay
              playsInline
              onClick={handleVideoClick}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            />

            {/* Video Play Button */}
            {index === currentIndex && showPlayOverlay && (
              <div
                className="absolute inset-0 flex items-center justify-center z-10 bg-black/40 cursor-pointer"
                onClick={handleVideoClick}
              >
                <div className="bg-white/20 p-4 rounded-full backdrop-blur-md">
                  <Play className="w-10 h-10 text-white" />
                </div>
              </div>
            )}

            {/* Video Info Overlay */}
            <div
              className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-4 pointer-events-none"
              style={{ touchAction: 'none' }}
            >
              <div className="flex justify-between items-end">
                {/* Description */}
                <div className="flex-1 text-white pr-4 relative">
                  <div
                    className={`relative text-sm font-medium mb-2 whitespace-pre-line transition-all duration-300 ${expandedDescription
                      ? "max-h-[60vh] pointer-events-auto"
                      : "line-clamp-4"
                      }`}
                  >

                    {expandedDescription && (
                      <div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedDescription(false);
                          }}
                          className="group relative cursor-pointer pointer-events-auto"
                        >
                          <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 group-hover:bg-white/20 transition-colors">
                            <X className="w-7 h-7 text-white group-hover:text-red-500 transition-colors" />
                          </div>
                        </button>
                      </div>
                    )}

                    {!expandedDescription && (
                      <div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedDescription(true);
                          }}
                          className="group relative cursor-pointer pointer-events-auto"
                        >
                          <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 group-hover:bg-white/20 transition-colors">
                            <ChevronUp className="w-7 h-7 text-white group-hover:text-green-400 transition-colors" />
                          </div>
                        </button>
                      </div>
                    )}

                    <p className={`${expandedDescription ? "overflow-y-auto max-h-[50vh]" : ""}`} style={{ scrollbarWidth: 'none' }}>
                      {video.description}
                    </p>

                  </div>

                  <div className="text-xs text-white/70">{formatNumber(video.views)} views</div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col items-center space-y-4 pointer-events-auto">
                  {/* Like Button */}
                  <button
                    onClick={() => handleLike(video.id)}
                    className="group relative cursor-pointer"
                  >
                    <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 group-hover:bg-white/20 transition-colors">
                      <Heart
                        className={`w-7 h-7 transition-colors ${video.liked
                          ? 'fill-red-500 text-red-500'
                          : 'text-white group-hover:text-red-500'
                          }`}
                      />
                    </div>
                    <span className="text-white text-xs font-medium mt-1 block">
                      {formatNumber(video.likes)}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}