import { loadAllUserTracks } from "./track_actions.js";
import { insertTrackIntoHTML } from "./DOM_fav_tracks_creator.js";
import { getViewportWidth } from "../utils/window_utils.js";

const pageInputSearchDelay = 400;
const keywordInputSearchDelay = 400;

let sortAscending = true;

let vw = 0;

const minTracksOnPage = 2;
const maxTracksOnPage = 8;
export let tracksOnPage = maxTracksOnPage;
let tracks = [];
let tracksCopy = [];
export let currentPage = 0;
let controlsHidden = false;

const controls = $("#pagination-controls");

let dispatchedFirstTracksRendered = false;

$(document).ready(() => {
  wrapper();
});

const wrapper = async () => {
  // tracks = JSON.parse(await loadAllUserTracks());
  tracks = [
    {
      Id: 491,
      Title:
        "Sonata for Cello & Piano in A Minor, Op. 36: II. Andante molto tranquillo",
      Duration: 361,
      Artist: { Id: 491, Name: "Claude Starck" },
      Preview:
        "https://cdns-preview-e.dzcdn.net/stream/c-e8586305005bee8d07a1fa507d8a0004-0.mp3",
      Album: {
        Id: 491,
        Title: "Chopin & Grieg: Sonatas for Cello & Piano",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/44eb3d73bd3e62bdf669c0cb962efa95/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "1986-05-01",
      DeezerRank: 6332,
      DeezerLink: "https://www.deezer.com/track/29482751",
      Bpm: 0,
    },
    {
      Id: 492,
      Title: "Billy Goat Stomp",
      Duration: 210,
      Artist: { Id: 492, Name: "Jelly Roll Morton" },
      Preview:
        "https://cdns-preview-1.dzcdn.net/stream/c-1923bd12f1d5a4f297f19261cce8b3d4-0.mp3",
      Album: {
        Id: 492,
        Title: "Doctor Jazz",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/b16ba30bc86c855dd026f9ad0ecda9ee/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2013-02-18",
      DeezerRank: 11563,
      DeezerLink: "https://www.deezer.com/track/66600540",
      Bpm: 0,
    },
    {
      Id: 493,
      Title: "La Tierra de Tus Encantos",
      Duration: 182,
      Artist: { Id: 493, Name: "Maria Medina" },
      Preview:
        "https://cdns-preview-2.dzcdn.net/stream/c-2053d5f7c1e8993482594660e9f305fc-1.mp3",
      Album: {
        Id: 493,
        Title: "Nuestra Canción ...",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/908df19f7ee3801acf274894eb346130/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2013-07-22",
      DeezerRank: 10261,
      DeezerLink: "https://www.deezer.com/track/69686482",
      Bpm: 0,
    },
    {
      Id: 494,
      Title: "My Way",
      Duration: 239,
      Artist: { Id: 494, Name: "Mike Brant" },
      Preview:
        "https://cdns-preview-c.dzcdn.net/stream/c-cfbba9d60242a16ff64f6160d0291188-7.mp3",
      Album: {
        Id: 494,
        Title: "20eme anniversaire",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/8b7fb8caf564828e0f284495255c2fa2/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "1995-03-22",
      DeezerRank: 102199,
      DeezerLink: "https://www.deezer.com/track/3131613",
      Bpm: 155.4,
    },
    {
      Id: 495,
      Title: "It's Coming Out Now",
      Duration: 280,
      Artist: { Id: 495, Name: "Destroy She Said" },
      Preview:
        "https://cdns-preview-7.dzcdn.net/stream/c-70c3ae1f0fa5be4d8e30c0817826a9ae-0.mp3",
      Album: {
        Id: 495,
        Title: "Down to Dirty",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/dd7c81bf7c62cdffb39b55d413b533fa/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-03-21",
      DeezerRank: 8886,
      DeezerLink: "https://www.deezer.com/track/70220946",
      Bpm: 77,
    },
    {
      Id: 496,
      Title: "Entre toi et moi",
      Duration: 258,
      Artist: { Id: 496, Name: "Elaine Kibaro" },
      Preview:
        "https://cdns-preview-3.dzcdn.net/stream/c-349163ac69d0c0ce18513a879163349e-3.mp3",
      Album: {
        Id: 496,
        Title: "L'Intemporel",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/766d503506239dc8e37578cb5e458483/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2010-03-30",
      DeezerRank: 17756,
      DeezerLink: "https://www.deezer.com/track/5952739",
      Bpm: 100,
    },
    {
      Id: 497,
      Title: "Knick Knack Paddywack",
      Duration: 165,
      Artist: { Id: 497, Name: "The Sign Posters" },
      Preview:
        "https://cdns-preview-3.dzcdn.net/stream/c-3b4f6d0b787a8523012581f60f69c9ef-0.mp3",
      Album: {
        Id: 497,
        Title: "Action Songs & Rhymes",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/8d2c131537606360af38dfc468b4ff8f/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2011-07-01",
      DeezerRank: 13654,
      DeezerLink: "https://www.deezer.com/track/60788681",
      Bpm: 0,
    },
    {
      Id: 498,
      Title: "In Contempt",
      Duration: 398,
      Artist: { Id: 498, Name: "The Nightmare Stage" },
      Preview:
        "https://cdns-preview-7.dzcdn.net/stream/c-743a0c5bf0e4cf38d1f27a2b8fa9cfd9-1.mp3",
      Album: {
        Id: 498,
        Title: "Free Admission For the Damned",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/f5f67f3f8335f1cf720744c23515a24c/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2010-05-01",
      DeezerRank: 18394,
      DeezerLink: "https://www.deezer.com/track/9252320",
      Bpm: 0,
    },
    {
      Id: 499,
      Title: "No Regrets",
      Duration: 277,
      Artist: { Id: 499, Name: "Klynt" },
      Preview:
        "https://cdns-preview-e.dzcdn.net/stream/c-e3153579771124db324c5a9ac2488a24-0.mp3",
      Album: {
        Id: 499,
        Title: "Of Klynt and Man",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/9c48b1d9283e607dcbe3f202d7f68bc0/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-05-10",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/72790190",
      Bpm: 0,
    },
    {
      Id: 500,
      Title:
        "2 Marches Caracteristiques, D.886 (1997 Digital Remaster): No. 2 in C Major (Allegro vivace)",
      Duration: 465,
      Artist: { Id: 500, Name: "Christoph Eschenbach/Justus Frantz" },
      Preview:
        "https://cdns-preview-d.dzcdn.net/stream/c-d359415edc213d1273804a3f29b2d38e-3.mp3",
      Album: {
        Id: 500,
        Title: "Schubert: Music For Piano Duet 1",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/d674c54e3b77b1cb082db2beb98d7687/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2006-09-29",
      DeezerRank: 27078,
      DeezerLink: "https://www.deezer.com/track/3418654",
      Bpm: 136,
    },
    {
      Id: 501,
      Title: "Change",
      Duration: 272,
      Artist: { Id: 501, Name: "Michelle Zalenski" },
      Preview:
        "https://cdns-preview-6.dzcdn.net/stream/c-6fa494d1b6d96e63fe6749dbec3ee189-0.mp3",
      Album: {
        Id: 501,
        Title: "Defining Moments",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/d7eb07fabf8e8633dff559bf930da558/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2010-04-10",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/9482778",
      Bpm: 0,
    },
    {
      Id: 502,
      Title: "Not Fade Away (Demonstration Version - Includes Lead Singer)",
      Duration: 108,
      Artist: { Id: 502, Name: "The Karaoke Channel" },
      Preview:
        "https://cdns-preview-8.dzcdn.net/stream/c-8e6e84a2a4e5be129fcb3d0789cbbd65-2.mp3",
      Album: {
        Id: 502,
        Title: "Karaoke - In the style of The Rolling Stones - Vol. 2",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/9b2abac4ee76bf0cf56276de87a16651/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2008-01-15",
      DeezerRank: 7790,
      DeezerLink: "https://www.deezer.com/track/6000136",
      Bpm: 114,
    },
    {
      Id: 503,
      Title: "Heartline",
      Duration: 183,
      Artist: { Id: 503, Name: "Joop Wolters" },
      Preview:
        "https://cdns-preview-2.dzcdn.net/stream/c-2072f0cf005ca4d7b8f708792a1607c9-0.mp3",
      Album: {
        Id: 503,
        Title: "Out of Order",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/42744fe951fbc8be610cebe4cab693ec/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-08-22",
      DeezerRank: 21418,
      DeezerLink: "https://www.deezer.com/track/83951691",
      Bpm: 0,
    },
    {
      Id: 504,
      Title: "Pressure",
      Duration: 496,
      Artist: { Id: 504, Name: "Anthony Parasole & Phil Moffa" },
      Preview:
        "https://cdns-preview-a.dzcdn.net/stream/c-a7ce17e94613f5366745f7b1c2b4dd05-2.mp3",
      Album: {
        Id: 504,
        Title: "Pressure",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/148b51be28381c76e7d58ed90570346f/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-02-09",
      DeezerRank: 25797,
      DeezerLink: "https://www.deezer.com/track/93499436",
      Bpm: 130,
    },
    {
      Id: 505,
      Title: "Rock a Bye Baby Blues",
      Duration: 137,
      Artist: { Id: 505, Name: "Brenda Lee" },
      Preview:
        "https://cdns-preview-0.dzcdn.net/stream/c-047bb85b969133c8b208583986420e7f-2.mp3",
      Album: {
        Id: 505,
        Title: "I'm Sorry - The Best of Brenda Lee (Remastered 2011)",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/3059bcaf275f5300ed7d77edcdd2339d/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2011-04-19",
      DeezerRank: 78239,
      DeezerLink: "https://www.deezer.com/track/10432264",
      Bpm: 123,
    },
    {
      Id: 506,
      Title: "Wear This Disco",
      Duration: 400,
      Artist: { Id: 506, Name: "Kid Shakers" },
      Preview:
        "https://cdns-preview-c.dzcdn.net/stream/c-c445933085ac515799b20cfbb10cd3bd-1.mp3",
      Album: {
        Id: 506,
        Title: "Club Session Summer Essentials",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/94ba31a960a58d820e541bb5bd20866e/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2013-08-15",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/69446773",
      Bpm: 126,
    },
    {
      Id: 507,
      Title: "My Cheryl Ann",
      Duration: 161,
      Artist: { Id: 507, Name: "Buddy Merrill" },
      Preview:
        "https://cdns-preview-5.dzcdn.net/stream/c-5c8395b7baea9119f67cd1a6f0803856-0.mp3",
      Album: {
        Id: 507,
        Title: "Sounds a la Guitar",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/d762ed11c8aa87803f58348ee747a87d/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2011-06-22",
      DeezerRank: 21191,
      DeezerLink: "https://www.deezer.com/track/13007460",
      Bpm: 129,
    },
    {
      Id: 508,
      Title: "Praise Jehovah / Holy Ground / Holy Holy Holy (Worship Medley)",
      Duration: 412,
      Artist: { Id: 508, Name: "Sonny Badu" },
      Preview:
        "https://cdns-preview-f.dzcdn.net/stream/c-f23084e1f0b6a0216aefd1dfb2be84e7-3.mp3",
      Album: {
        Id: 508,
        Title: "Rain (The Renewal Live)",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/6e0ff68888fb2a911cfa993688fb424b/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-07-13",
      DeezerRank: 61731,
      DeezerLink: "https://www.deezer.com/track/17383870",
      Bpm: 93,
    },
    {
      Id: 509,
      Title: "Besame Mucho",
      Duration: 145,
      Artist: { Id: 509, Name: "Dean Martin" },
      Preview:
        "https://cdns-preview-a.dzcdn.net/stream/c-a7e3337555a5a566969d894296623994-1.mp3",
      Album: {
        Id: 509,
        Title: "Dino Latino",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/35a74413f5f9cff06149fdd7bb0c405b/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-02-28",
      DeezerRank: 112107,
      DeezerLink: "https://www.deezer.com/track/75172426",
      Bpm: 185,
    },
    {
      Id: 510,
      Title: "Steamboat Willie",
      Duration: 124,
      Artist: { Id: 510, Name: "Boy Wonder" },
      Preview:
        "https://cdns-preview-a.dzcdn.net/stream/c-ac69385b41ab84d4b8374ff274b51596-0.mp3",
      Album: {
        Id: 510,
        Title: "Raise the Signal",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/967a8ed287b9fa764aa83f2a541b6110/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "0000-00-00",
      DeezerRank: 20937,
      DeezerLink: "https://www.deezer.com/track/70432808",
      Bpm: 0,
    },
    {
      Id: 511,
      Title: "Lost Inna Shadows",
      Duration: 114,
      Artist: { Id: 511, Name: "Crazy Mountain Billies" },
      Preview:
        "https://cdns-preview-2.dzcdn.net/stream/c-2f0bcbc701c191aeef9402c700835352-0.mp3",
      Album: {
        Id: 511,
        Title: "Hit Like a Hammer",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/d48edb1b20fb76cc75c3caf5a81da149/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-09-05",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/75847620",
      Bpm: 78,
    },
    {
      Id: 512,
      Title: "Happy! Lucky!",
      Duration: 231,
      Artist: { Id: 512, Name: "Meguriai" },
      Preview:
        "https://cdns-preview-d.dzcdn.net/stream/c-d80c9ef13727a994e44f472a65d5b7c1-0.mp3",
      Album: {
        Id: 512,
        Title: "Meguriai",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/8303eef14d8fdaab207230c040059bf7/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2013-10-02",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/71060060",
      Bpm: 0,
    },
    {
      Id: 513,
      Title: "Sevebildim",
      Duration: 222,
      Artist: { Id: 513, Name: "Derhan" },
      Preview:
        "https://cdns-preview-2.dzcdn.net/stream/c-2f4824f149f7687db5adcb4d562b5d09-2.mp3",
      Album: {
        Id: 513,
        Title: "Dedim Ya",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/6dc7943a83a42141b0a84804a1fff0dd/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2020-03-06",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/91110847",
      Bpm: 72,
    },
    {
      Id: 514,
      Title: "Mavro",
      Duration: 222,
      Artist: { Id: 514, Name: "Andreas Lambrou" },
      Preview:
        "https://cdns-preview-1.dzcdn.net/stream/c-169248b565a7a37d594e7e576aaaa797-0.mp3",
      Album: {
        Id: 514,
        Title: "Meditation",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/c83e685915f3b86cf30d4085d7704f5e/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "0000-00-00",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/16100893",
      Bpm: 0,
    },
    {
      Id: 515,
      Title: "Old & Strong / The Mountain Song",
      Duration: 145,
      Artist: { Id: 515, Name: "Janet Russell & Christine Kydd" },
      Preview:
        "https://cdns-preview-0.dzcdn.net/stream/c-036f0ef625f10b76f7643b8cc04ad421-1.mp3",
      Album: {
        Id: 515,
        Title: "Janet Russell & Christine Kydd",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/1eef18ae2f4b43a1d5aea8c31c24e1fd/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "1988-01-01",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/7579726",
      Bpm: 0,
    },
    {
      Id: 516,
      Title: "Thais, Act II: Meditation (arr. for tuba and harp)",
      Duration: 291,
      Artist: { Id: 516, Name: "Andreas Martin Hofmeir" },
      Preview:
        "https://cdns-preview-8.dzcdn.net/stream/c-8b2eca90f0512a413e06b7713e1199e1-1.mp3",
      Album: {
        Id: 516,
        Title: "Why Not?",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/998451232df91d3323a0c7a8721be98c/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-08-13",
      DeezerRank: 25807,
      DeezerLink: "https://www.deezer.com/track/82889534",
      Bpm: 121,
    },
    {
      Id: 517,
      Title: "El hombre del seiscientos",
      Duration: 332,
      Artist: { Id: 517, Name: "Moncho Alpuente y Curro Fatás" },
      Preview:
        "https://cdns-preview-2.dzcdn.net/stream/c-2518bf347b50ed912688a0af22af5071-0.mp3",
      Album: {
        Id: 517,
        Title: "Humor libre",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/f1833949d9b1de95a184a65fa63ba093/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2003-01-03",
      DeezerRank: 25775,
      DeezerLink: "https://www.deezer.com/track/6554768",
      Bpm: 112,
    },
    {
      Id: 518,
      Title: "Scene IV, Part II",
      Duration: 32,
      Artist: { Id: 518, Name: "Mark Lamos" },
      Preview:
        "https://cdns-preview-f.dzcdn.net/stream/c-f79c3db2902572908b3245bbba53023f-3.mp3",
      Album: {
        Id: 518,
        Title: "Cyrano",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/b7f4dd375025ca3acccfed2e7433d21c/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2007-02-27",
      DeezerRank: 18157,
      DeezerLink: "https://www.deezer.com/track/4621872",
      Bpm: 84.5,
    },
    {
      Id: 519,
      Title: "So gehn die Gauchos (So gehn die Deutschen)",
      Duration: 182,
      Artist: { Id: 519, Name: "Willi Herren" },
      Preview:
        "https://cdns-preview-f.dzcdn.net/stream/c-f757f51a288f07adfd02b5269b8c33a0-21.mp3",
      Album: {
        Id: 519,
        Title:
          "Apres Ski @ it’s Best – Die besten Hits für die Hütten Karneval Schlager Party des Jahres 2014 bis 2015",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/79623c3d240682b3fc90dbd2aff716f6/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2015-02-19",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/92791650",
      Bpm: 142.1,
    },
    {
      Id: 520,
      Title: "In The Sky",
      Duration: 229,
      Artist: { Id: 520, Name: "Zucchero" },
      Preview:
        "https://cdns-preview-8.dzcdn.net/stream/c-84af4d9f7aa337961ec7c8726a44bfd5-2.mp3",
      Album: {
        Id: 520,
        Title: "Chocabeck",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/e503af3bdd457d3942d82d3a9ebd8b3d/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2011-10-04",
      DeezerRank: 15362,
      DeezerLink: "https://www.deezer.com/track/17442107",
      Bpm: 110,
    },
    {
      Id: 521,
      Title: "Pocketful of Hearts",
      Duration: 116,
      Artist: { Id: 521, Name: "Eddie Cochran" },
      Preview:
        "https://cdns-preview-9.dzcdn.net/stream/c-9a1ba60a9e9606066d64cb7e68ffd827-3.mp3",
      Album: {
        Id: 521,
        Title: "All My Succes - Eddie Cochran",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/b77612fa80c31113471a71e7f77940d9/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2011-06-13",
      DeezerRank: 1620,
      DeezerLink: "https://www.deezer.com/track/12321689",
      Bpm: 135,
    },
    {
      Id: 522,
      Title: "You Will Be Here (Originally Performed by Anita Cochran)",
      Duration: 243,
      Artist: { Id: 522, Name: "MIDIFine Systems" },
      Preview:
        "https://cdns-preview-c.dzcdn.net/stream/c-cb3b4d515910bc884f3f5067d50698c6-0.mp3",
      Album: {
        Id: 522,
        Title: "Best for Musicians No. 014",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/35e7cd00f8742fc255fe726f4941e2d8/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "0000-00-00",
      DeezerRank: 15,
      DeezerLink: "https://www.deezer.com/track/75664026",
      Bpm: 0,
    },
    {
      Id: 523,
      Title: "Dolce Vita 2010 (Fabrice Potec Edit)",
      Duration: 184,
      Artist: { Id: 523, Name: "Ms Project" },
      Preview:
        "https://cdns-preview-9.dzcdn.net/stream/c-9eb398ea0cf57561982ea9db424bc648-2.mp3",
      Album: {
        Id: 523,
        Title: "Dolce Vita 2010",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/b88645d916c6d931d256c565a4e28649/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2010-10-25",
      DeezerRank: 21540,
      DeezerLink: "https://www.deezer.com/track/7452690",
      Bpm: 130,
    },
    {
      Id: 524,
      Title: "I'll Never Be The Same",
      Duration: 297,
      Artist: { Id: 524, Name: "Sun Ra Arkestra" },
      Preview:
        "https://cdns-preview-7.dzcdn.net/stream/c-7bad3157e77f690ea2cde7595e69fcb9-0.mp3",
      Album: {
        Id: 524,
        Title: "Mayan Temples",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/5bf02907a6cb28699b0190c9a0c52da5/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-05-07",
      DeezerRank: 21102,
      DeezerLink: "https://www.deezer.com/track/72168614",
      Bpm: 0,
    },
    {
      Id: 525,
      Title: "I'll Take You There",
      Duration: 261,
      Artist: { Id: 525, Name: "The Memory Lane" },
      Preview:
        "https://cdns-preview-3.dzcdn.net/stream/c-310f8b0f8dac10abe22c397f45558a4e-2.mp3",
      Album: {
        Id: 525,
        Title: "Remember 1972: A Trip Down Memory Lane...",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/869495176ab5e7125140e5da6275cf50/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-12-03",
      DeezerRank: 3375,
      DeezerLink: "https://www.deezer.com/track/91453102",
      Bpm: 102,
    },
    {
      Id: 526,
      Title: "Funky",
      Duration: 447,
      Artist: { Id: 526, Name: "Omer Jazz Quartet" },
      Preview:
        "https://cdns-preview-4.dzcdn.net/stream/c-4f59bb1a362801ba8626e005cbdd19ad-0.mp3",
      Album: {
        Id: 526,
        Title: "Miss Wata",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/a8e08c8f8ce4ada9f92c1e2853ad3461/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2013-12-09",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/72551182",
      Bpm: 0,
    },
    {
      Id: 527,
      Title: "Picture from Your Album",
      Duration: 144,
      Artist: { Id: 527, Name: "Eddie Meduza" },
      Preview:
        "https://cdns-preview-2.dzcdn.net/stream/c-2ddb4ae1ec0dce7a15cc76c6e680beb4-1.mp3",
      Album: {
        Id: 527,
        Title: "Eddie's garderob",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/202e0947a9e35a31d78bab321816e884/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "1994-05-02",
      DeezerRank: 30284,
      DeezerLink: "https://www.deezer.com/track/31672251",
      Bpm: 105,
    },
    {
      Id: 528,
      Title: "Minimal Freaks",
      Duration: 380,
      Artist: { Id: 528, Name: "Myka" },
      Preview:
        "https://cdns-preview-d.dzcdn.net/stream/c-dcdf1f554c2a63bcd4f39294c1ae3bbe-2.mp3",
      Album: {
        Id: 528,
        Title: "Fireworks, Vol. 6 (Part 1)",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/10928451d3809de435f13a45acceeca1/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2011-02-24",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/8109956",
      Bpm: 105,
    },
    {
      Id: 529,
      Title: "Ball Point Ink Alchemy",
      Duration: 51,
      Artist: { Id: 529, Name: "Alfred Howard & the K23 Orchestra" },
      Preview:
        "https://cdns-preview-b.dzcdn.net/stream/c-bd2217a7b8014a9a63e0492585a18003-0.mp3",
      Album: {
        Id: 529,
        Title: "Live at Lestats Volume II",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/e734ecaa9870a7aa9838ac5c29a3fb43/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2004-01-01",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/9246188",
      Bpm: 0,
    },
    {
      Id: 530,
      Title: "Hush Little Baby",
      Duration: 69,
      Artist: { Id: 530, Name: "Songs For Toddlers" },
      Preview:
        "https://cdns-preview-b.dzcdn.net/stream/c-bdb76b8bef253bdc2af8894e249afd2c-8.mp3",
      Album: {
        Id: 530,
        Title: "30 Songs For Kids",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/ecf7f4e7661b469504164bd84a46a965/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2011-07-03",
      DeezerRank: 7848,
      DeezerLink: "https://www.deezer.com/track/12800072",
      Bpm: 135.6,
    },
    {
      Id: 531,
      Title: "Cotton Eye Joe (DJIgsaw Sunset Vox Remix)",
      Duration: 333,
      Artist: { Id: 531, Name: "Fun-Tastic-3" },
      Preview:
        "https://cdns-preview-0.dzcdn.net/stream/c-01087415f90a41fb441265fcc2f36c72-4.mp3",
      Album: {
        Id: 531,
        Title: "Cotton Eye Joe",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/382d958fd4f98063147e4ab9b2e64697/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2008-11-04",
      DeezerRank: 26834,
      DeezerLink: "https://www.deezer.com/track/2735864",
      Bpm: 105,
    },
    {
      Id: 532,
      Title: "Montague Terrace (In Blue)",
      Duration: 267,
      Artist: { Id: 532, Name: "Pieter-Jan De Smet" },
      Preview:
        "https://cdns-preview-2.dzcdn.net/stream/c-27711f4396751c552127aa2e25fbbd4a-2.mp3",
      Album: {
        Id: 532,
        Title: "August",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/d7edd1c661b8b1a87eb946ef887d3b61/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2004-12-10",
      DeezerRank: 26712,
      DeezerLink: "https://www.deezer.com/track/3307164",
      Bpm: 136.9,
    },
    {
      Id: 533,
      Title: "Nasini El Donya",
      Duration: 270,
      Artist: { Id: 533, Name: "Ragheb Alama" },
      Preview:
        "https://cdns-preview-9.dzcdn.net/stream/c-9dae4c66836320eb80c63c09cb83fbe2-5.mp3",
      Album: {
        Id: 533,
        Title: "El Hob El Kebir",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/d46c3cc74bc01d7eb6a7749da1e1d1cc/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-07-12",
      DeezerRank: 485049,
      DeezerLink: "https://www.deezer.com/track/81103716",
      Bpm: 186.2,
    },
    {
      Id: 534,
      Title: "Cambalache",
      Duration: 243,
      Artist: { Id: 534, Name: "Rodrigo Gabriela Mediterranean Ensemble" },
      Preview:
        "https://cdns-preview-6.dzcdn.net/stream/c-6d16b3a0b44e66f82ad596886f104f1f-0.mp3",
      Album: {
        Id: 534,
        Title:
          "Mediterranean Chill Out - World Lounge from Barcelona, Morocco, Lisbon, Spain",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/ee5f63e6aafdeb7134e4bc045f5d7eec/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2012-03-01",
      DeezerRank: 51525,
      DeezerLink: "https://www.deezer.com/track/33037181",
      Bpm: 114,
    },
    {
      Id: 535,
      Title: "Hey Liley Liley Lo",
      Duration: 123,
      Artist: { Id: 535, Name: "The Brothers Four" },
      Preview:
        "https://cdns-preview-2.dzcdn.net/stream/c-2337033f738393334ef765e8cb44703b-2.mp3",
      Album: {
        Id: 535,
        Title: "Greenfields and Other Folk Music Greats - First Five Albums",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/e8fc31a592ea2eb35d7b38a147550a7a/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2012-07-17",
      DeezerRank: 18512,
      DeezerLink: "https://www.deezer.com/track/64511131",
      Bpm: 104.9,
    },
    {
      Id: 536,
      Title: "Careless Love",
      Duration: 183,
      Artist: { Id: 536, Name: "Ray Charles" },
      Preview:
        "https://cdns-preview-2.dzcdn.net/stream/c-27a3076989e4fbde836c44f8fa267c27-1.mp3",
      Album: {
        Id: 536,
        Title: "Singular Genius: The Complete ABC Singles",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/f39e61f6d1baec5508d0430cd1431e86/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2013-01-29",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/18143197",
      Bpm: 129,
    },
    {
      Id: 537,
      Title: "Empty Room",
      Duration: 253,
      Artist: { Id: 537, Name: "Dubstep" },
      Preview:
        "https://cdns-preview-c.dzcdn.net/stream/c-ca3c49e412066179c727eb114eb17c74-2.mp3",
      Album: {
        Id: 537,
        Title: "Silvester Chillout",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/114ccec1945232169fc95f5daabd77b6/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-11-29",
      DeezerRank: 18803,
      DeezerLink: "https://www.deezer.com/track/91287738",
      Bpm: 0,
    },
    {
      Id: 538,
      Title: "Sevillana del moviladi",
      Duration: 202,
      Artist: { Id: 538, Name: "Tempranillo" },
      Preview:
        "https://cdns-preview-2.dzcdn.net/stream/c-2492145113dd6e2c455e6fa02c308538-0.mp3",
      Album: {
        Id: 538,
        Title: "Sevillanas de Feria y Bodega",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/baf4cd1bb379e15cf147e0984401a144/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-02-23",
      DeezerRank: 30229,
      DeezerLink: "https://www.deezer.com/track/68367355",
      Bpm: 179,
    },
    {
      Id: 539,
      Title: "Innocent Time",
      Duration: 257,
      Artist: { Id: 539, Name: "Carroll Brown" },
      Preview:
        "https://cdns-preview-1.dzcdn.net/stream/c-1962496295c9e7ec0b4c11757bf20c9c-0.mp3",
      Album: {
        Id: 539,
        Title: "Homegrown Love",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/c4e225b1fbb3592d85b373b5574e7089/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "0000-00-00",
      DeezerRank: 26765,
      DeezerLink: "https://www.deezer.com/track/76837614",
      Bpm: 0,
    },
    {
      Id: 540,
      Title: "Lessons Learned",
      Duration: 92,
      Artist: { Id: 540, Name: "Higher & Higher" },
      Preview:
        "https://cdns-preview-9.dzcdn.net/stream/c-9c8144089a7e488d5b1977ba892e0ab2-0.mp3",
      Album: {
        Id: 540,
        Title: "Higher & Higher",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/b81cd39a971f413b6d98277d8b930723/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "0000-00-00",
      DeezerRank: 26938,
      DeezerLink: "https://www.deezer.com/track/76656394",
      Bpm: 149.8,
    },
    {
      Id: 541,
      Title: "Modelo de la Noche",
      Duration: 299,
      Artist: { Id: 541, Name: "Karibe con K" },
      Preview:
        "https://cdns-preview-7.dzcdn.net/stream/c-7f39eb0abf053760a636e4a11a2e4bc1-3.mp3",
      Album: {
        Id: 541,
        Title: "Nueva Generación",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/af1319e2610c8753ed86682cadcfe081/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "1998-07-08",
      DeezerRank: 10263,
      DeezerLink: "https://www.deezer.com/track/93216948",
      Bpm: 0,
    },
    {
      Id: 542,
      Title: "Waltz Across Christmas (Original Mix)",
      Duration: 225,
      Artist: { Id: 542, Name: "Gary D Matthews" },
      Preview:
        "https://cdns-preview-d.dzcdn.net/stream/c-d495bb49759c4b8e3c673d048bd6b296-2.mp3",
      Album: {
        Id: 542,
        Title: "A Christmas Candle",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/21d8b6c7f0fb802cc05dbba1e53d28f4/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "0000-00-00",
      DeezerRank: 3564,
      DeezerLink: "https://www.deezer.com/track/89830169",
      Bpm: 0,
    },
    {
      Id: 543,
      Title: "Back in Time",
      Duration: 369,
      Artist: { Id: 543, Name: "AtomicLAB" },
      Preview:
        "https://cdns-preview-4.dzcdn.net/stream/c-456115bc0a28082ab3dd5751f20d1c2f-1.mp3",
      Album: {
        Id: 543,
        Title: "Under Attack",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/e77bcd442eb36abd6bb67a735af4e3fe/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2015-01-26",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/41157231",
      Bpm: 105,
    },
    {
      Id: 544,
      Title: "Mississippi",
      Duration: 147,
      Artist: { Id: 544, Name: "Kay Starr" },
      Preview:
        "https://cdns-preview-8.dzcdn.net/stream/c-8702eb35fa532f3da198ff154691dcde-3.mp3",
      Album: {
        Id: 544,
        Title: "Side by Side",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/d53a1548ac607ca6b8fb6288ec7d9656/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2015-04-21",
      DeezerRank: 4,
      DeezerLink: "https://www.deezer.com/track/98495646",
      Bpm: 154,
    },
    {
      Id: 545,
      Title: "Please Don't Go",
      Duration: 149,
      Artist: { Id: 545, Name: "John Lee Hooker" },
      Preview:
        "https://cdns-preview-5.dzcdn.net/stream/c-57eea84beed9b4ab50ef2b45242c2d49-4.mp3",
      Album: {
        Id: 545,
        Title: "I Love...",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/3b343840fcdd1a9bddddd1a1b4e6cf3b/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2015-02-05",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/58979261",
      Bpm: 138,
    },
    {
      Id: 546,
      Title: "Photograph",
      Duration: 238,
      Artist: { Id: 546, Name: "12 Stones" },
      Preview:
        "https://cdns-preview-2.dzcdn.net/stream/c-2d250e35376c2bcd94f53af47c8853ef-1.mp3",
      Album: {
        Id: 546,
        Title: "Elektra: The Album",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/f9a5a64455393f2b774d35f3dffdd676/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-06-24",
      DeezerRank: 22272,
      DeezerLink: "https://www.deezer.com/track/80297744",
      Bpm: 123.4,
    },
    {
      Id: 547,
      Title: "Little Bird",
      Duration: 227,
      Artist: { Id: 547, Name: "Solid Air" },
      Preview:
        "https://cdns-preview-6.dzcdn.net/stream/c-6aaaea75e14701c581172cda919b0b68-1.mp3",
      Album: {
        Id: 547,
        Title: "Tailgates and Substitutes",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/8c9fd0047921c9dd59c4dbd08ca5867e/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2004-08-17",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/11152048",
      Bpm: 133,
    },
    {
      Id: 548,
      Title: "Wunderbar",
      Duration: 220,
      Artist: { Id: 548, Name: "Alfred Drake" },
      Preview:
        "https://cdns-preview-c.dzcdn.net/stream/c-ca0e5a3bc1992c4b5c2dd381c74264d3-5.mp3",
      Album: {
        Id: 548,
        Title: "Kiss Me Kate - Original Motion Picture Soundtrack",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/743e2182d44ed4d9447dc7925a4054e3/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2011-06-01",
      DeezerRank: 8967,
      DeezerLink: "https://www.deezer.com/track/12461150",
      Bpm: 100,
    },
    {
      Id: 549,
      Title: "Walker",
      Duration: 223,
      Artist: { Id: 549, Name: "Weaknesses" },
      Preview:
        "https://cdns-preview-0.dzcdn.net/stream/c-0a99d4be4189e54d6be64d271538fe28-0.mp3",
      Album: {
        Id: 549,
        Title: "Ghost Brother EP",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/90f2df612e80919fb0f3c7271b3b1460/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "0000-00-00",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/79866304",
      Bpm: 0,
    },
    {
      Id: 550,
      Title: "Think Twice in the Style of Celine Dion",
      Duration: 286,
      Artist: { Id: 550, Name: "Sunfly Karaoke" },
      Preview:
        "https://cdns-preview-1.dzcdn.net/stream/c-1f1cbb824e9759e299e32e938360f75b-2.mp3",
      Album: {
        Id: 550,
        Title: "Ultimate 90s, Vol. 1",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/7a65a4c3294a46bff3cfdf5992fc710a/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2009-08-10",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/13401819",
      Bpm: 133,
    },
    {
      Id: 551,
      Title: "Oblivion",
      Duration: 188,
      Artist: { Id: 551, Name: "Son'ra" },
      Preview:
        "https://cdns-preview-a.dzcdn.net/stream/c-a5db3894c450f8a61aa569ce0b56fdfc-0.mp3",
      Album: {
        Id: 551,
        Title: "Electro World Son'Ra (Son'Ra)",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/6aa4276b8abf4e3a765a7af840de7fed/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-09-08",
      DeezerRank: 10084,
      DeezerLink: "https://www.deezer.com/track/82362072",
      Bpm: 128,
    },
    {
      Id: 552,
      Title: "El Tiempo de la Bestia",
      Duration: 225,
      Artist: { Id: 552, Name: "Luzbel" },
      Preview:
        "https://cdns-preview-8.dzcdn.net/stream/c-89808757b8d9bc55ce2e20a582026bc6-1.mp3",
      Album: {
        Id: 552,
        Title: "El Tiempo de la Bestia",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/81dad2026d4889679860f8b8cebfba9d/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2015-03-01",
      DeezerRank: 53451,
      DeezerLink: "https://www.deezer.com/track/80442444",
      Bpm: 137,
    },
    {
      Id: 553,
      Title: "Ma garce de ville",
      Duration: 164,
      Artist: { Id: 553, Name: "Pierre Arvay et son orchestre" },
      Preview:
        "https://cdns-preview-0.dzcdn.net/stream/c-09dcf6c0a0b9b4d17df32c8c727c5f1c-2.mp3",
      Album: {
        Id: 553,
        Title: "Venus Party",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/76d6d93b3580aab4dfe47a14c95e9ffc/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-11-18",
      DeezerRank: 5350,
      DeezerLink: "https://www.deezer.com/track/91104553",
      Bpm: 83,
    },
    {
      Id: 554,
      Title: "Dare to Dream (Darsen Remix)",
      Duration: 339,
      Artist: { Id: 554, Name: "Pat Farrell" },
      Preview:
        "https://cdns-preview-4.dzcdn.net/stream/c-410097c5173674bbfb521a6dea61fe35-5.mp3",
      Album: {
        Id: 554,
        Title: "Marathon (Deluxe Edition)",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/b58515d84049c6d12f5cc82e9338c1d8/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2015-03-27",
      DeezerRank: 3,
      DeezerLink: "https://www.deezer.com/track/97368968",
      Bpm: 128,
    },
    {
      Id: 555,
      Title: "Man on the Street",
      Duration: 146,
      Artist: { Id: 555, Name: "Bob Dylan" },
      Preview:
        "https://cdns-preview-f.dzcdn.net/stream/c-f02a591d47f85eb9664ddd34dc4c243b-1.mp3",
      Album: {
        Id: 555,
        Title: "Bob Dylan : Recorded in NY 1961",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/c7d2018db6cefe20ad98e4ffb9a90cee/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-01-26",
      DeezerRank: 6012,
      DeezerLink: "https://www.deezer.com/track/15571722",
      Bpm: 129.6,
    },
    {
      Id: 556,
      Title: "What Care I",
      Duration: 197,
      Artist: { Id: 556, Name: "Stanley Holloway" },
      Preview:
        "https://cdns-preview-2.dzcdn.net/stream/c-20fb81c5c9716a0fab1da82e5fd023c7-0.mp3",
      Album: {
        Id: 556,
        Title: "My Missus, Vol. 1",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/17903a59d09ecd035a7218b0666082cd/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-09-02",
      DeezerRank: 1264,
      DeezerLink: "https://www.deezer.com/track/76320087",
      Bpm: 0,
    },
    {
      Id: 557,
      Title: "Slam-In' Around",
      Duration: 165,
      Artist: { Id: 557, Name: "Don Byas" },
      Preview:
        "https://cdns-preview-c.dzcdn.net/stream/c-c5d180f6e668befacd95db20d81f5fc9-4.mp3",
      Album: {
        Id: 557,
        Title: "Don Byas Selected Favorites",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/c20b4818f7f0c109afd1a79d49ef08cf/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2011-03-21",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/12529387",
      Bpm: 129,
    },
    {
      Id: 558,
      Title: "Incredible (Gel Studio Mix)",
      Duration: 281,
      Artist: { Id: 558, Name: "Dom Sellect" },
      Preview:
        "https://cdns-preview-a.dzcdn.net/stream/c-a798d5ed015e05fe2182106803b735fa-2.mp3",
      Album: {
        Id: 558,
        Title: "Call Me Miami Sound Summer 2014",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/640ca52be859712b7b9221f9fa98b836/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "0000-00-00",
      DeezerRank: 2294,
      DeezerLink: "https://www.deezer.com/track/78609249",
      Bpm: 128,
    },
    {
      Id: 559,
      Title: "Georgia",
      Duration: 199,
      Artist: { Id: 559, Name: "Paul Whiteman" },
      Preview:
        "https://cdns-preview-1.dzcdn.net/stream/c-1ef479d563fc20b55eb4db8d21aa7a36-6.mp3",
      Album: {
        Id: 559,
        Title: "All the Greatest Masterpieces (Remastered)",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/18b60a64ae0f076aaa9564fa2dd06eb0/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2015-01-15",
      DeezerRank: 1,
      DeezerLink: "https://www.deezer.com/track/75913294",
      Bpm: 0,
    },
    {
      Id: 560,
      Title: "I'm Never Gonna Be Alone Anymore",
      Duration: 153,
      Artist: { Id: 560, Name: "The Cornelius Brothers" },
      Preview:
        "https://cdns-preview-1.dzcdn.net/stream/c-121be2115d8981e47af2303e5066c4dd-0.mp3",
      Album: {
        Id: 560,
        Title: "The Very Best Of The Cornelius Brothers",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/bf418e83ed30789604e12a0e8b8caf22/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2011-04-01",
      DeezerRank: 2760,
      DeezerLink: "https://www.deezer.com/track/11543655",
      Bpm: 0,
    },
    {
      Id: 561,
      Title:
        "Act II: Wer in die Dornen greift (Erscheinungen de Nichts, Muley)",
      Duration: 196,
      Artist: { Id: 561, Name: "Franz Hawlata" },
      Preview:
        "https://cdns-preview-c.dzcdn.net/stream/c-c4f9e7b9d5804daab644e351fbe865c7-0.mp3",
      Album: {
        Id: 561,
        Title: "Loewe, C.: Drei Wunsche (Die) [Opera]",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/58aa18083efe7f1860684638cb1ac3f2/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "1998-01-01",
      DeezerRank: 22202,
      DeezerLink: "https://www.deezer.com/track/46923131",
      Bpm: 0,
    },
    {
      Id: 562,
      Title: "Pour It",
      Duration: 205,
      Artist: { Id: 562, Name: "Prince Faheim" },
      Preview:
        "https://cdns-preview-e.dzcdn.net/stream/c-ef0b8987c932412e379bb5517eba5236-0.mp3",
      Album: {
        Id: 562,
        Title: "Pour It",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/297028c2ae95b1814154ad437ad12138/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-08-09",
      DeezerRank: 2046,
      DeezerLink: "https://www.deezer.com/track/78940467",
      Bpm: 0,
    },
    {
      Id: 563,
      Title:
        "The Things That We All Do for Love (In the Style of Nona Gaye) [Performance Track with Demonstration Vocals]",
      Duration: 359,
      Artist: { Id: 563, Name: "Done Again" },
      Preview:
        "https://cdns-preview-b.dzcdn.net/stream/c-bf5c4c056fe2c11a2ea7898eff2a5302-0.mp3",
      Album: {
        Id: 563,
        Title:
          "The Things That We All Do for Love (In the Style of Nona Gaye) [Performance Track with Demonstration Vocals] - Single",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/7954a4ea550d16396938c940618656f1/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2013-10-22",
      DeezerRank: 1459,
      DeezerLink: "https://www.deezer.com/track/62335202",
      Bpm: 149.8,
    },
    {
      Id: 564,
      Title: "Everyday",
      Duration: 211,
      Artist: { Id: 564, Name: "In.Times.Of.Silence" },
      Preview:
        "https://cdns-preview-c.dzcdn.net/stream/c-c569bbf9f269c67f96faa0be5796e30a-3.mp3",
      Album: {
        Id: 564,
        Title: "In.Times.Of.Silence Live at Maxwell's 01/11/2006",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/015e17b55b566827cfac06ce694b5097/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2006-01-11",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/1969420",
      Bpm: 104,
    },
    {
      Id: 565,
      Title: "Scattin' At the Cotton Club (Remastered)",
      Duration: 199,
      Artist: { Id: 565, Name: "Duke Ellington" },
      Preview:
        "https://cdns-preview-7.dzcdn.net/stream/c-7b4681747eb6145377c829491f418dc9-3.mp3",
      Album: {
        Id: 565,
        Title: "Exposition Swing",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/66023102d25eeadbbe765a79379b1c7e/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-12-31",
      DeezerRank: 3,
      DeezerLink: "https://www.deezer.com/track/9978869",
      Bpm: 141,
    },
    {
      Id: 566,
      Title: "This Little Bird",
      Duration: 126,
      Artist: { Id: 566, Name: "Spell" },
      Preview:
        "https://cdns-preview-7.dzcdn.net/stream/c-7b4faeb083d7af61d61606498d0b7004-3.mp3",
      Album: {
        Id: 566,
        Title: "Seasons In The Sun",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/d4650c01b9551564bad6193927b8747d/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-11-24",
      DeezerRank: 8645,
      DeezerLink: "https://www.deezer.com/track/89976893",
      Bpm: 0,
    },
    {
      Id: 567,
      Title: "Slow and Easy (Remastered)",
      Duration: 185,
      Artist: { Id: 567, Name: "Henry Mancini" },
      Preview:
        "https://cdns-preview-b.dzcdn.net/stream/c-b09f189c01c281acf2a922aea1a145ff-0.mp3",
      Album: {
        Id: 567,
        Title: "Remastered Hits",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/e0c1aa199f9e1e36ff1ec61a392f1815/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2010-01-01",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/76326405",
      Bpm: 160,
    },
    {
      Id: 568,
      Title: "Home Is Where You Hang Yourself",
      Duration: 249,
      Artist: { Id: 568, Name: "Every Time I Die" },
      Preview:
        "https://cdns-preview-0.dzcdn.net/stream/c-0f9a6c8b92f24119f09af6f12f5c6c4a-0.mp3",
      Album: {
        Id: 568,
        Title: "The Burial Plot Bidding War",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/9ac0963b64b06f6cf6166f7151d9cbd4/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2007-03-29",
      DeezerRank: 6609,
      DeezerLink: "https://www.deezer.com/track/11200389",
      Bpm: 0,
    },
    {
      Id: 569,
      Title: "Swappin' Song",
      Duration: 118,
      Artist: { Id: 569, Name: "Jennifer Rose" },
      Preview:
        "https://cdns-preview-6.dzcdn.net/stream/c-6ab8d82aec073c2a65cd594a71e2fc85-0.mp3",
      Album: {
        Id: 569,
        Title: "Morning Will Come",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/2b89a07206debd1bfce7f230fa3f3bb9/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "0000-00-00",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/69961596",
      Bpm: 0,
    },
    {
      Id: 570,
      Title: "Brother, Can You Spare a Dime?/Can't Buy Me Love",
      Duration: 309,
      Artist: { Id: 570, Name: "Joan Stiles" },
      Preview:
        "https://cdns-preview-2.dzcdn.net/stream/c-24c9f5e80c59892ac6781c7aaa76a7c5-0.mp3",
      Album: {
        Id: 570,
        Title: "Three Musicians",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/bd7b6681e20838c8076eb559054d5bac/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "0000-00-00",
      DeezerRank: 6926,
      DeezerLink: "https://www.deezer.com/track/78225846",
      Bpm: 0,
    },
    {
      Id: 571,
      Title: "Tokyo Rose",
      Duration: 251,
      Artist: { Id: 571, Name: "Angels Love Devils" },
      Preview:
        "https://cdns-preview-5.dzcdn.net/stream/c-5835a2b53fbaf57a7a838baa0f3cfcd2-0.mp3",
      Album: {
        Id: 571,
        Title: "Phase 1",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/0d9ee1685a5a4e999a141a34be3a2a4d/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "0000-00-00",
      DeezerRank: 2833,
      DeezerLink: "https://www.deezer.com/track/77228568",
      Bpm: 0,
    },
    {
      Id: 572,
      Title: "U Used to Hold Me (Sir Nenis DJ Version)",
      Duration: 462,
      Artist: { Id: 572, Name: "Screamin' Rachael" },
      Preview:
        "https://cdns-preview-8.dzcdn.net/stream/c-88b3cb2672cab2ad80441ae4fa6c6caa-0.mp3",
      Album: {
        Id: 572,
        Title: "U Used to Hold Me (The Todd Terry Remixes)",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/3d4afa5d0e457abe60f1c836b8382dc0/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2013-07-19",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/72058184",
      Bpm: 0,
    },
    {
      Id: 573,
      Title: "Un accident",
      Duration: 246,
      Artist: { Id: 573, Name: "Michel Sardou" },
      Preview:
        "https://cdns-preview-9.dzcdn.net/stream/c-97dbf81485d4cc24fbece9afb80364fd-6.mp3",
      Album: {
        Id: 573,
        Title: "La Maladie D'Amour",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/a1902bc0ac20438c8d248ecadda6a018/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2004-06-07",
      DeezerRank: 242820,
      DeezerLink: "https://www.deezer.com/track/1086375",
      Bpm: 170.8,
    },
    {
      Id: 574,
      Title: "Unta en saa",
      Duration: 185,
      Artist: { Id: 574, Name: "Eero Raittinen" },
      Preview:
        "https://cdns-preview-b.dzcdn.net/stream/c-b51dbe769b07630ce37edce166c89e24-4.mp3",
      Album: {
        Id: 574,
        Title: "Tähtisarja - 30 Suosikkia",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/dd42ac4fa4ed27f790b1c202eda56a6b/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2012-10-02",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/61207341",
      Bpm: 111.7,
    },
    {
      Id: 575,
      Title: "De Mi Arrabal",
      Duration: 203,
      Artist: { Id: 575, Name: "Roberto Firpo" },
      Preview:
        "https://cdns-preview-b.dzcdn.net/stream/c-bbfa20930e7a80c46b0a6a1246a91b84-2.mp3",
      Album: {
        Id: 575,
        Title: "El Entrerriano",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/ee216947d50a660a46552644e8524139/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "0000-00-00",
      DeezerRank: 7,
      DeezerLink: "https://www.deezer.com/track/89794225",
      Bpm: 111.4,
    },
    {
      Id: 576,
      Title: "Testing 1, 2, 3 (Live Manchester, NH 3-1-04)",
      Duration: 200,
      Artist: { Id: 576, Name: "Barenaked Ladies" },
      Preview:
        "https://cdns-preview-2.dzcdn.net/stream/c-2d42d1d8a687dadc207b849032f5c135-2.mp3",
      Album: {
        Id: 576,
        Title: "Play Everywhere For Everyone - Manchester, NH 3-1-04",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/6fcdea3cf646e935a2f27ce2aa98c670/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2006-04-04",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/14627647",
      Bpm: 0,
    },
    {
      Id: 577,
      Title: "Louis Girl",
      Duration: 310,
      Artist: { Id: 577, Name: "Affyzzle" },
      Preview:
        "https://cdns-preview-9.dzcdn.net/stream/c-9641c9b7b53e3d178f179c4e864ae145-3.mp3",
      Album: {
        Id: 577,
        Title: "Louis Girl",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/840b485ed768eb6fdc8f99fe55774d14/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2010-05-10",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/42793251",
      Bpm: 75,
    },
    {
      Id: 578,
      Title: "After the Rain",
      Duration: 219,
      Artist: { Id: 578, Name: "Eugen Doga" },
      Preview:
        "https://cdns-preview-d.dzcdn.net/stream/c-ddc0abd3160adfca48540179c6fc41a3-0.mp3",
      Album: {
        Id: 578,
        Title: "Dreaming of Spring",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/66bbb70de69f0d2781a438246deffd3e/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-02-12",
      DeezerRank: 9723,
      DeezerLink: "https://www.deezer.com/track/73237511",
      Bpm: 116,
    },
    {
      Id: 579,
      Title: "Your Heart Belongs to Me (Remastered)",
      Duration: 156,
      Artist: { Id: 579, Name: "Diana Ross &The Supremes" },
      Preview:
        "https://cdns-preview-5.dzcdn.net/stream/c-5010c4786d95dd00c08c84f0dfc5d68f-0.mp3",
      Album: {
        Id: 579,
        Title: "Top Soul & R'n'B (100 Hits Remastered)",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/c6dc049d8bf4968cd8a194c3da533274/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2015-01-07",
      DeezerRank: 4,
      DeezerLink: "https://www.deezer.com/track/89704489",
      Bpm: 107.7,
    },
    {
      Id: 580,
      Title: "Medley: Danza Kuduro / Rabiosa / Rain Over Me",
      Duration: 370,
      Artist: { Id: 580, Name: "Extra Latino" },
      Preview:
        "https://cdns-preview-9.dzcdn.net/stream/c-946736b813731e060ddffa61860f5a81-4.mp3",
      Album: {
        Id: 580,
        Title: "Ultra Latina Hits 2013",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/1124387024d67e62382c160c226cf3e0/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2015-05-21",
      DeezerRank: 8963,
      DeezerLink: "https://www.deezer.com/track/70020918",
      Bpm: 130,
    },
    {
      Id: 581,
      Title: "Lost In A Dream",
      Duration: 399,
      Artist: { Id: 581, Name: "Paul Motian" },
      Preview:
        "https://cdns-preview-e.dzcdn.net/stream/c-e3ce8fcdac44b5f6cb36187b0ae27562-4.mp3",
      Album: {
        Id: 581,
        Title: "Lost In A Dream",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/4db4e1a44b5c5f0b91318e837fd5a55f/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2010-03-19",
      DeezerRank: 72326,
      DeezerLink: "https://www.deezer.com/track/5423074",
      Bpm: 0,
    },
    {
      Id: 582,
      Title:
        "The End of the World (Karaoke Version) (Originally Performed By Herman's Hermits)",
      Duration: 185,
      Artist: { Id: 582, Name: "Dohn Joe" },
      Preview:
        "https://cdns-preview-f.dzcdn.net/stream/c-fdaf0ce1fa8f17ad09c8b755da3f903e-0.mp3",
      Album: {
        Id: 582,
        Title: "50 Greatest Karaoke Hits, Vol. 70",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/de88dad27bb239e9b243deab07f3798e/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-09-12",
      DeezerRank: 521,
      DeezerLink: "https://www.deezer.com/track/75021160",
      Bpm: 120,
    },
    {
      Id: 583,
      Title: "Angels",
      Duration: 179,
      Artist: { Id: 583, Name: "Heart" },
      Preview:
        "https://cdns-preview-9.dzcdn.net/stream/c-9503f3329e5b8faad0172ab479ce2eb2-0.mp3",
      Album: {
        Id: 583,
        Title: "Strange Euphoria",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/b2f84730f81fc4c5e79cf2325626fdab/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "0000-00-00",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/32140731",
      Bpm: 0,
    },
    {
      Id: 584,
      Title: "White Flag",
      Duration: 217,
      Artist: { Id: 584, Name: "Starlite Karaoke" },
      Preview:
        "https://cdns-preview-f.dzcdn.net/stream/c-fe7c2c5b46c8973e54d07ada85c7dcfd-0.mp3",
      Album: {
        Id: 584,
        Title: "Karaoke: Dido",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/5d6f645337288bb00563786729569265/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-09-03",
      DeezerRank: 21865,
      DeezerLink: "https://www.deezer.com/track/84662089",
      Bpm: 0,
    },
    {
      Id: 585,
      Title:
        'Police Arrive (from the Original Motion Picture Soundtrack to "On A Dark and Stormy Night")',
      Duration: 52,
      Artist: { Id: 585, Name: "Aldo Shillaku" },
      Preview:
        "https://cdns-preview-f.dzcdn.net/stream/c-f6205e427fd10ea21d9ae1e67bc2462d-0.mp3",
      Album: {
        Id: 585,
        Title:
          "On A Dark And Stormy Night (Original Motion Picture Soundtrack)",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/864f6ea06feba1c8647e7906bf789237/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "0000-00-00",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/65420902",
      Bpm: 0,
    },
    {
      Id: 586,
      Title: "Protector",
      Duration: 434,
      Artist: { Id: 586, Name: "Klartraum" },
      Preview:
        "https://cdns-preview-7.dzcdn.net/stream/c-7bb6c3728e989f9fc282891f3ce8dc33-4.mp3",
      Album: {
        Id: 586,
        Title:
          "One Nature One Space - Panorama of Deep Minimal Berlin Underground Club Tech House, Dub Techno & Jazzy Electronica Music",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/e7ab796cd60543b281bb3ce607ff337d/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-07-30",
      DeezerRank: 20868,
      DeezerLink: "https://www.deezer.com/track/82318290",
      Bpm: 0,
    },
    {
      Id: 587,
      Title: "Traición",
      Duration: 160,
      Artist: { Id: 587, Name: "Orquesta Sinfónica de RTVE" },
      Preview:
        "https://cdns-preview-e.dzcdn.net/stream/c-e221920f09d56dca47b743843dd232ac-0.mp3",
      Album: {
        Id: 587,
        Title: "Zipi & Zape y el Club de la Canica (Banda Sonora Original)",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/794f26ec09fce59bb184e7ded27f0f5d/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-05-30",
      DeezerRank: 26022,
      DeezerLink: "https://www.deezer.com/track/73944459",
      Bpm: 80,
    },
    {
      Id: 588,
      Title: "The Timid Gentlemen",
      Duration: 193,
      Artist: { Id: 588, Name: "Anadivine" },
      Preview:
        "https://cdns-preview-9.dzcdn.net/stream/c-97f7f62e905ccb35cca04de3038a8edc-3.mp3",
      Album: {
        Id: 588,
        Title: "Zoo",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/e51c1ae996b5c6f75c884434ee278bf2/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2008-03-10",
      DeezerRank: 25055,
      DeezerLink: "https://www.deezer.com/track/63901028",
      Bpm: 0,
    },
    {
      Id: 589,
      Title: "Somebody That I Used to Know (Extended Mix)",
      Duration: 301,
      Artist: { Id: 589, Name: "Hoxygen feat. Linda" },
      Preview:
        "https://cdns-preview-6.dzcdn.net/stream/c-639579a3060b7754a6d1fa71b8414a7d-0.mp3",
      Album: {
        Id: 589,
        Title: "Bigroom Anthem Kingz",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/4d505071b73670bda9bf178610b72654/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2013-01-29",
      DeezerRank: 21532,
      DeezerLink: "https://www.deezer.com/track/63930371",
      Bpm: 0,
    },
    {
      Id: 590,
      Title: "Early",
      Duration: 308,
      Artist: { Id: 590, Name: "Julian Franco" },
      Preview:
        "https://cdns-preview-2.dzcdn.net/stream/c-2b14877238e0e9762f2287adb65a6e5b-2.mp3",
      Album: {
        Id: 590,
        Title: "This Sort of Things",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/1be66eb1a378972d4204b49245837d74/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2015-02-01",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/94279430",
      Bpm: 140,
    },
    {
      Id: 591,
      Title: "Sad Walks (Original Mix)",
      Duration: 477,
      Artist: { Id: 591, Name: "Tomtomgroove" },
      Preview:
        "https://cdns-preview-8.dzcdn.net/stream/c-8e9b20bad5539cf04714c8b9254c535c-1.mp3",
      Album: {
        Id: 591,
        Title: "What Shakespeare Said",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/11e8d64b2524720b3fdff4033ff3f0bc/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "0000-00-00",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/16658663",
      Bpm: 0,
    },
    {
      Id: 592,
      Title: "Three O'Clock Blues",
      Duration: 179,
      Artist: { Id: 592, Name: "B.B. King" },
      Preview:
        "https://cdns-preview-0.dzcdn.net/stream/c-0df17c6633bfc6454aa5d7e8d16b8c07-1.mp3",
      Album: {
        Id: 592,
        Title: "Treasures From The Vault",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/688f02a34220f8377b09577ffee479ff/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2006-10-11",
      DeezerRank: 21726,
      DeezerLink: "https://www.deezer.com/track/5673137",
      Bpm: 105,
    },
    {
      Id: 593,
      Title: "Tokyo Dub Plates",
      Duration: 258,
      Artist: { Id: 593, Name: "Thrust Lab" },
      Preview:
        "https://cdns-preview-2.dzcdn.net/stream/c-2c97c20cda5896cca10bf2e54f6ba3a2-0.mp3",
      Album: {
        Id: 593,
        Title: "Polterparty",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/57f01e6d8bef645373172a62e7ee41e5/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-08-11",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/78689727",
      Bpm: 0,
    },
    {
      Id: 594,
      Title: "Prelude and Allegro",
      Duration: 541,
      Artist: { Id: 594, Name: "The Vienna Orchestra" },
      Preview:
        "https://cdns-preview-d.dzcdn.net/stream/c-ddfc9a841c26c2cd216d0509206fc809-2.mp3",
      Album: {
        Id: 594,
        Title: "Berlinski, Gerschefski, Ballou: Orchestral Works",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/467ce384e65c08f305025716d1490c70/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-01-31",
      DeezerRank: 6945,
      DeezerLink: "https://www.deezer.com/track/64090812",
      Bpm: 119,
    },
    {
      Id: 595,
      Title: "IV. Choral. Hier ist das rechte Osterlamm (Coro)",
      Duration: 77,
      Artist: { Id: 595, Name: "Pieter Jan Leusink" },
      Preview:
        "https://cdns-preview-5.dzcdn.net/stream/c-54dd5b25414e6bd46773f5f4ae50ba28-0.mp3",
      Album: {
        Id: 595,
        Title: "J.S. Bach: Complete Edition, Vol. 7/10",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/1e6c60e8e1cead77114d14a7d7354320/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-12-05",
      DeezerRank: 2969,
      DeezerLink: "https://www.deezer.com/track/86652731",
      Bpm: 0,
    },
    {
      Id: 596,
      Title: "Mo'fuckers (Original Mix)",
      Duration: 296,
      Artist: { Id: 596, Name: "Olly James" },
      Preview:
        "https://cdns-preview-b.dzcdn.net/stream/c-b49f20a9c5d0fe7a2c6a474277dc3b78-3.mp3",
      Album: {
        Id: 596,
        Title: "Live Free and Party Hard Vol. 5",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/26cfd6eaa1787ef2b500384a9adc1530/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2015-02-02",
      DeezerRank: 33125,
      DeezerLink: "https://www.deezer.com/track/94252966",
      Bpm: 128,
    },
    {
      Id: 597,
      Title: "Savoy Blues",
      Duration: 193,
      Artist: { Id: 597, Name: "Louis Armstrong & His Hot Seven" },
      Preview:
        "https://cdns-preview-3.dzcdn.net/stream/c-39b58d55452c77662e170d028c52be7c-6.mp3",
      Album: {
        Id: 597,
        Title: "I Just Want to Make Music, Vol. 3",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/4678943a0fbb574994df2ad2c5c3a54b/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2006-06-30",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/92021792",
      Bpm: 105,
    },
    {
      Id: 598,
      Title: "Be Bop",
      Duration: 267,
      Artist: { Id: 598, Name: "Virtual Alien" },
      Preview:
        "https://cdns-preview-1.dzcdn.net/stream/c-15fb2f8a79d77ddfdabd6eefee727f2f-2.mp3",
      Album: {
        Id: 598,
        Title: "V.A. Presents Old Nick",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/8b759791197ebd9e3e62ca3e201b0a30/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-10-06",
      DeezerRank: 153,
      DeezerLink: "https://www.deezer.com/track/87656481",
      Bpm: 0,
    },
    {
      Id: 599,
      Title: "Surfin' Safari",
      Duration: 126,
      Artist: { Id: 599, Name: "The Beach Boys" },
      Preview:
        "https://cdns-preview-c.dzcdn.net/stream/c-cece41e5f56b4872d3947b95247324f7-0.mp3",
      Album: {
        Id: 599,
        Title: "Let's Go to the Beach",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/33812b14f4b5ec664fa2d6c0d2d1fbf0/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2009-10-06",
      DeezerRank: 24913,
      DeezerLink: "https://www.deezer.com/track/80946250",
      Bpm: 0,
    },
    {
      Id: 600,
      Title: "First Taken Third Found (Phylr Remix)",
      Duration: 381,
      Artist: { Id: 600, Name: "Pigface" },
      Preview:
        "https://cdns-preview-8.dzcdn.net/stream/c-8326bd6f10a22b0c53d3a6c21ede0192-0.mp3",
      Album: {
        Id: 600,
        Title: "A New High In Low Limited Edition 3-cd Re-issue",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/13700d27b058c294b1c4ce6866ad561e/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "0000-00-00",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/62370910",
      Bpm: 0,
    },
    {
      Id: 601,
      Title: "Lovely",
      Duration: 850,
      Artist: { Id: 601, Name: "T. Ruggieri" },
      Preview:
        "https://cdns-preview-0.dzcdn.net/stream/c-0ec955253ca447c5cd4285b41c38f9e0-1.mp3",
      Album: {
        Id: 601,
        Title: "Darkestra",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/c635d0ca1ca74e40e964e211fe0d1dfd/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2010-09-29",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/6858446",
      Bpm: 0,
    },
    {
      Id: 602,
      Title: "Shawnuff",
      Duration: 176,
      Artist: { Id: 602, Name: "Dizzy Gillespie" },
      Preview:
        "https://cdns-preview-2.dzcdn.net/stream/c-24065cf1048556237ed6277ec547f8cb-0.mp3",
      Album: {
        Id: 602,
        Title: "Famous Jazz Instrumentalists",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/086d6d2358cba864fb79034cbd07f6cb/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-07-18",
      DeezerRank: 1,
      DeezerLink: "https://www.deezer.com/track/81422414",
      Bpm: 142,
    },
    {
      Id: 603,
      Title: "Hypnotized",
      Duration: 250,
      Artist: { Id: 603, Name: "Lexy & K-Paul" },
      Preview:
        "https://cdns-preview-7.dzcdn.net/stream/c-78d8cfe40993111d94ea1054ae20a014-2.mp3",
      Album: {
        Id: 603,
        Title: "Abrakadabra",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/ea78b0b933c185696ca79c5e10ebda50/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2009-03-13",
      DeezerRank: 69959,
      DeezerLink: "https://www.deezer.com/track/62172175",
      Bpm: 126.821,
    },
    {
      Id: 604,
      Title: "Antifone Mariane",
      Duration: 151,
      Artist: { Id: 604, Name: "M. Giuliano Viabile" },
      Preview:
        "https://cdns-preview-b.dzcdn.net/stream/c-b2dd517a9ea6b992b697494825df6d08-3.mp3",
      Album: {
        Id: 604,
        Title:
          "Collana canti per la liturgia: Qui il verbo si fece carne (Messa del settimo centenario della Santa casa)",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/cb3f9b336149c487e4a788bd74a682b4/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-12-18",
      DeezerRank: 11554,
      DeezerLink: "https://www.deezer.com/track/92529064",
      Bpm: 96,
    },
    {
      Id: 605,
      Title:
        'Little Brown Gal [In the Style of "Traditional"] {Karaoke Demonstration With Lead Vocal}',
      Duration: 141,
      Artist: { Id: 605, Name: "The Karaoke Channel" },
      Preview:
        "https://cdns-preview-8.dzcdn.net/stream/c-849210a8a9a868149955e5812b8e7a70-2.mp3",
      Album: {
        Id: 605,
        Title: "Stingray Music Karaoke - Specialty Vol. 10",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/447b04b2ed4bc6f16c3ab97da1102336/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2010-03-18",
      DeezerRank: 25124,
      DeezerLink: "https://www.deezer.com/track/5779096",
      Bpm: 0,
    },
    {
      Id: 606,
      Title: "Future",
      Duration: 1,
      Artist: { Id: 606, Name: "Piano Tribute Players" },
      Preview:
        "https://cdns-preview-4.dzcdn.net/stream/c-44a66642e118d12c7d488d67efb521b3-1.mp3",
      Album: {
        Id: 606,
        Title: "Piano Tribute to Paramore, Vol. 3",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/11d3ec2531590a30378e2c0bda7ee268/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2015-02-28",
      DeezerRank: 11605,
      DeezerLink: "https://www.deezer.com/track/67216854",
      Bpm: 102,
    },
    {
      Id: 607,
      Title: "Constellations",
      Duration: 184,
      Artist: { Id: 607, Name: "Inviolet Row" },
      Preview:
        "https://cdns-preview-4.dzcdn.net/stream/c-40be7b83e45d9b2ecefbe408f759001c-0.mp3",
      Album: {
        Id: 607,
        Title: "Consolation Prizes",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/128047b7651a98e65103f54e20174d2e/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "0000-00-00",
      DeezerRank: 3073,
      DeezerLink: "https://www.deezer.com/track/70020861",
      Bpm: 135.1,
    },
    {
      Id: 608,
      Title: "Suite I in G Major, BWV 1007: II. Allemande",
      Duration: 251,
      Artist: { Id: 608, Name: "Dmitry Badiarov" },
      Preview:
        "https://cdns-preview-2.dzcdn.net/stream/c-29c4a756aa55eef7c008a2106b5bd159-5.mp3",
      Album: {
        Id: 608,
        Title: "Bach: Cello Suites",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/02480bad0ec7e5291855ae5f49c25f37/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2010-09-09",
      DeezerRank: 21778,
      DeezerLink: "https://www.deezer.com/track/17767853",
      Bpm: 78,
    },
    {
      Id: 609,
      Title:
        "Comfortably Numb (No Guitar Solo) [In the Style of Pink Floyd] [Karaoke Version]",
      Duration: 388,
      Artist: { Id: 609, Name: "Karaoke - Ameritz" },
      Preview:
        "https://cdns-preview-7.dzcdn.net/stream/c-7dc86e3146661dd939af87bb439985ed-0.mp3",
      Album: {
        Id: 609,
        Title: "Karaoke Hits from the 1970's, Vol. 17",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/e382fdc848d3f4c4ce3fd11fec237f08/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-05-11",
      DeezerRank: 7898,
      DeezerLink: "https://www.deezer.com/track/72979825",
      Bpm: 126,
    },
    {
      Id: 610,
      Title: "Erinnerung an einen schmutzigen Engel, Kapitel 67",
      Duration: 420,
      Artist: { Id: 610, Name: "Henning Mankell" },
      Preview:
        "https://cdns-preview-b.dzcdn.net/stream/c-bfa7a098fb3d632c20958b2afb6dbd29-2.mp3",
      Album: {
        Id: 610,
        Title: "Erinnerung an einen schmutzigen Engel (Ungekürzt) (Ungekürzt)",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/d1aeea2d182d1ceb53482e3191adf3a3/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2015-03-02",
      DeezerRank: 414,
      DeezerLink: "https://www.deezer.com/track/96327914",
      Bpm: 0,
    },
    {
      Id: 611,
      Title: "Back Down (Album Version Edited)",
      Duration: 243,
      Artist: { Id: 611, Name: "50 Cent" },
      Preview:
        "https://cdns-preview-9.dzcdn.net/stream/c-93bb408482128743e845bf13f6225827-5.mp3",
      Album: {
        Id: 611,
        Title: "Get Rich Or Die Tryin'",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/3d58e9dbdccb57b925a32f69e127b1ba/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2003-02-09",
      DeezerRank: 102696,
      DeezerLink: "https://www.deezer.com/track/2304728",
      Bpm: 88.9,
    },
    {
      Id: 612,
      Title: "If Only I",
      Duration: 226,
      Artist: { Id: 612, Name: "Mr Furious" },
      Preview:
        "https://cdns-preview-e.dzcdn.net/stream/c-eaa147c6f0cc77d2a0a7af2b12b80bdb-0.mp3",
      Album: {
        Id: 612,
        Title: "Get Furious",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/ef86ef25cdb8d3729e51de73db286328/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2008-01-08",
      DeezerRank: 2599,
      DeezerLink: "https://www.deezer.com/track/99264642",
      Bpm: 0,
    },
    {
      Id: 613,
      Title: "O parceiro",
      Duration: 189,
      Artist: { Id: 613, Name: "Beale Street" },
      Preview:
        "https://cdns-preview-3.dzcdn.net/stream/c-3b9fa486180244686a0a34ce73cf7a51-0.mp3",
      Album: {
        Id: 613,
        Title: "Vibratto",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/9280f819f24fce3abc7438d71d1ec286/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2006-11-13",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/11501770",
      Bpm: 0,
    },
    {
      Id: 614,
      Title: "Lisbon Antigua",
      Duration: 171,
      Artist: { Id: 614, Name: "Edmundo Ros" },
      Preview:
        "https://cdns-preview-b.dzcdn.net/stream/c-bfddda52a34222359ea666fd243c4908-2.mp3",
      Album: {
        Id: 614,
        Title: "Smooth, Vol. 2",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/cab4cfed9b6de33d3a026f96a942cd81/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2011-06-10",
      DeezerRank: 3406,
      DeezerLink: "https://www.deezer.com/track/96058116",
      Bpm: 0,
    },
    {
      Id: 615,
      Title: "מחרוזת: אני עומד על הבמה",
      Duration: 1251,
      Artist: { Id: 615, Name: "ג'ורג' בר" },
      Preview:
        "https://cdns-preview-c.dzcdn.net/stream/c-cb1e3ce3eb59a912c12bde5453699545-2.mp3",
      Album: {
        Id: 615,
        Title: "הלילה לא נגמר",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/1bfea4df8629c188e4ce7bd0c086bdbc/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-10-09",
      DeezerRank: 1104,
      DeezerLink: "https://www.deezer.com/track/87782643",
      Bpm: 0,
    },
    {
      Id: 616,
      Title: "Le printemps",
      Duration: 281,
      Artist: { Id: 616, Name: "Benham" },
      Preview:
        "https://cdns-preview-e.dzcdn.net/stream/c-efd1575ab8fce9cbad963c8099241355-3.mp3",
      Album: {
        Id: 616,
        Title: "Partisan d'un Monde Meilleur",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/77d0896e2cadd3abcb7659fefc291231/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2011-05-05",
      DeezerRank: 26031,
      DeezerLink: "https://www.deezer.com/track/10417409",
      Bpm: 120,
    },
    {
      Id: 617,
      Title: "Maggie",
      Duration: 250,
      Artist: { Id: 617, Name: "Karaoke - Ameritz" },
      Preview:
        "https://cdns-preview-e.dzcdn.net/stream/c-e31921eb36de8b1d25592dee52c40aa8-4.mp3",
      Album: {
        Id: 617,
        Title: "Karaoke - Foster & Allen",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/372866b99ddbfc2f2d419cd413af7367/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2007-07-19",
      DeezerRank: 402,
      DeezerLink: "https://www.deezer.com/track/1724376",
      Bpm: 98,
    },
    {
      Id: 618,
      Title: "African Geisha",
      Duration: 437,
      Artist: { Id: 618, Name: "Aufgang" },
      Preview:
        "https://cdns-preview-d.dzcdn.net/stream/c-dcc519a787cfad96825b57414fbd9c54-1.mp3",
      Album: {
        Id: 618,
        Title: "Istiklaliya [Deezer Session]",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/000ccfbe468d731c161dc8e878fdf55b/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-01-24",
      DeezerRank: 54096,
      DeezerLink: "https://www.deezer.com/track/67655939",
      Bpm: 124,
    },
    {
      Id: 619,
      Title: "My Number One (Handsup)",
      Duration: 310,
      Artist: { Id: 619, Name: "U-Can" },
      Preview:
        "https://cdns-preview-7.dzcdn.net/stream/c-7765fb8a1dbcb9f31a040f8e1a4d1c1e-0.mp3",
      Album: {
        Id: 619,
        Title: "Aerobic Musik Workout",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/590c703db3009d44d3ade9d8c38c95af/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "0000-00-00",
      DeezerRank: 62,
      DeezerLink: "https://www.deezer.com/track/64181499",
      Bpm: 0,
    },
    {
      Id: 620,
      Title: "I'll Wait Forever",
      Duration: 184,
      Artist: { Id: 620, Name: "Anita Wood" },
      Preview:
        "https://cdns-preview-6.dzcdn.net/stream/c-6e89441ef081c3601ce15e0a11398c39-0.mp3",
      Album: {
        Id: 620,
        Title: "50's Hits Vol 5",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/c69919db278917de5b75b513b40b676e/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-05-10",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/72938586",
      Bpm: 0,
    },
    {
      Id: 621,
      Title: "Infiltration",
      Duration: 265,
      Artist: { Id: 621, Name: "Drokx" },
      Preview:
        "https://cdns-preview-2.dzcdn.net/stream/c-24b657943ec4d399fdca742c457cca4b-0.mp3",
      Album: {
        Id: 621,
        Title: "Inception",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/bed406784c8d1160457ae8af57326f83/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2015-07-25",
      DeezerRank: 8407,
      DeezerLink: "https://www.deezer.com/track/99560696",
      Bpm: 0,
    },
    {
      Id: 622,
      Title: "The Boy (Ralph's Hard House Mix)",
      Duration: 232,
      Artist: { Id: 622, Name: "R.B.M." },
      Preview:
        "https://cdns-preview-5.dzcdn.net/stream/c-5fea64c4f36c021d9be98d305897dea2-0.mp3",
      Album: {
        Id: 622,
        Title:
          "Strictly Rhythm - the Lost Tapes: 'Little' Louie Vega at the Underground",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/3eca9474f6b2f96fbaf07e5a6b95c124/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-12-13",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/76712689",
      Bpm: 0,
    },
    {
      Id: 623,
      Title: "Sheikh Abdullah",
      Duration: 292,
      Artist: { Id: 623, Name: "Abdul Majeed Abdullah" },
      Preview:
        "https://cdns-preview-0.dzcdn.net/stream/c-01808c43fe71a743a82106cdabfb4ea3-5.mp3",
      Album: {
        Id: 623,
        Title: "Ensan Aktar",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/b639107fb84d4f35dbc9b2cceb1681db/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2006-01-01",
      DeezerRank: 11819,
      DeezerLink: "https://www.deezer.com/track/1630072",
      Bpm: 94,
    },
    {
      Id: 624,
      Title: "Barcelona",
      Duration: 377,
      Artist: { Id: 624, Name: "Kakkeplay" },
      Preview:
        "https://cdns-preview-a.dzcdn.net/stream/c-abdb12d2cae2e55531b18930d75b2645-2.mp3",
      Album: {
        Id: 624,
        Title: "The Tropical House Collection",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/6d421a72780e46406006c4087863b2e1/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2015-04-28",
      DeezerRank: 25699,
      DeezerLink: "https://www.deezer.com/track/98198200",
      Bpm: 126,
    },
    {
      Id: 625,
      Title: "Warriors - Ancient Claims",
      Duration: 95,
      Artist: { Id: 625, Name: "Chris Huelsbeck" },
      Preview:
        "https://cdns-preview-8.dzcdn.net/stream/c-8a24a14d35e0d7da533beac26f0fe6c8-0.mp3",
      Album: {
        Id: 625,
        Title: "Infinite Space: Resurrection (Original Soundtrack)",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/787baf08f008c803b519485f7428bfc6/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-06-03",
      DeezerRank: 21334,
      DeezerLink: "https://www.deezer.com/track/86688033",
      Bpm: 128,
    },
    {
      Id: 626,
      Title: "Es gibt nur eine Frau in meinem Leben",
      Duration: 202,
      Artist: { Id: 626, Name: "Stefan Lucca / Lukas" },
      Preview:
        "https://cdns-preview-6.dzcdn.net/stream/c-6ae8065697e1c08f61e2bdb3989f7e1d-2.mp3",
      Album: {
        Id: 626,
        Title: "Du und Ich",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/eaad96641492b1074fd9be73258eb804/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "0000-00-00",
      DeezerRank: 16872,
      DeezerLink: "https://www.deezer.com/track/62554816",
      Bpm: 0,
    },
    {
      Id: 627,
      Title: "É uma Festa",
      Duration: 201,
      Artist: { Id: 627, Name: "Picolé" },
      Preview:
        "https://cdns-preview-8.dzcdn.net/stream/c-82bcc08cb044f9561821eed779ad6da4-3.mp3",
      Album: {
        Id: 627,
        Title: "O Disco da Picolé",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/8313e8ed6275a40923091b9eadd0e3ed/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2015-02-03",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/65135728",
      Bpm: 130,
    },
    {
      Id: 628,
      Title: "El relicario",
      Duration: 153,
      Artist: { Id: 628, Name: "Andre Verchuren" },
      Preview:
        "https://cdns-preview-3.dzcdn.net/stream/c-3f45fccf335c769e6fa993af86df4618-6.mp3",
      Album: {
        Id: 628,
        Title: "André Verchuren - Accordéon en fête Vol.2 - Grands succès",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/c208a02be930ff14343dd66b9228365b/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2011-09-14",
      DeezerRank: 11798,
      DeezerLink: "https://www.deezer.com/track/13781226",
      Bpm: 137.8,
    },
    {
      Id: 629,
      Title: "Gizon Arrunt Bat",
      Duration: 353,
      Artist: { Id: 629, Name: "Miztura" },
      Preview:
        "https://cdns-preview-f.dzcdn.net/stream/c-fa6ceda6e51b3fe35b2f084c5efc48e2-0.mp3",
      Album: {
        Id: 629,
        Title: "Acuarela Songs 3",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/34b0852e7c03824db28f72549e7ee44c/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2004-07-27",
      DeezerRank: 21969,
      DeezerLink: "https://www.deezer.com/track/68494021",
      Bpm: 0,
    },
    {
      Id: 630,
      Title: "Chew, Chew, Chew",
      Duration: 142,
      Artist: { Id: 630, Name: "Don Redman" },
      Preview:
        "https://cdns-preview-2.dzcdn.net/stream/c-2d040c934eaf1821b63dc7447fbf627f-1.mp3",
      Album: {
        Id: 630,
        Title: "Beyond Patina Jazz Masters: Don Redman",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/ad4cee817d518016847eb86c02b4e2cb/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-07-15",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/60966607",
      Bpm: 106,
    },
    {
      Id: 631,
      Title: "Mind Over Body",
      Duration: 338,
      Artist: { Id: 631, Name: "Drain Sth" },
      Preview:
        "https://cdns-preview-8.dzcdn.net/stream/c-8da83ea2a5af94f1e92f3dd3bb11afb6-0.mp3",
      Album: {
        Id: 631,
        Title: "Horror Wrestling",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/52eadde37c286b5227e96cf472046c76/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "0000-00-00",
      DeezerRank: 48539,
      DeezerLink: "https://www.deezer.com/track/64531793",
      Bpm: 175.2,
    },
    {
      Id: 632,
      Title: "Wade In the Water",
      Duration: 249,
      Artist: { Id: 632, Name: "Little Faith" },
      Preview:
        "https://cdns-preview-c.dzcdn.net/stream/c-cd7b8b9f447cac0a4ab5315372b611c4-0.mp3",
      Album: {
        Id: 632,
        Title: "Spirituals",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/716349910e8557849e023c0d2fd71dc4/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "0000-00-00",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/83378954",
      Bpm: 0,
    },
    {
      Id: 633,
      Title: "Slow Down Little Brother",
      Duration: 361,
      Artist: { Id: 633, Name: "Regi Harvey" },
      Preview:
        "https://cdns-preview-3.dzcdn.net/stream/c-3d0a17a8724e46b37d59c424138a3e8c-0.mp3",
      Album: {
        Id: 633,
        Title: "Mine's A little Different, Too!",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/49d69c504eda73fb292549c1717663d1/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "0000-00-00",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/64321836",
      Bpm: 0,
    },
    {
      Id: 634,
      Title: 'Theme from a Professional Gun (From "Professional Gun")',
      Duration: 195,
      Artist: { Id: 634, Name: "The Film Band" },
      Preview:
        "https://cdns-preview-1.dzcdn.net/stream/c-11f185284542c78dde5d4b36b2c34aac-7.mp3",
      Album: {
        Id: 634,
        Title: "Música de Cine - Western",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/274b8a566fadf49d29ce58c8ae3a1bf5/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2012-10-29",
      DeezerRank: 25814,
      DeezerLink: "https://www.deezer.com/track/62277050",
      Bpm: 136,
    },
    {
      Id: 635,
      Title: "Lord Of The Dance",
      Duration: 158,
      Artist: { Id: 635, Name: "Celtic Roots" },
      Preview:
        "https://cdns-preview-f.dzcdn.net/stream/c-fd0216a4dc9562769d86cd0a6239f5c3-0.mp3",
      Album: {
        Id: 635,
        Title:
          "Essential Irish Drinking Songs - Ireland's All Time Pub Favorites",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/ae309500a2291493fb560a7c738853f2/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2012-03-16",
      DeezerRank: 26946,
      DeezerLink: "https://www.deezer.com/track/17194239",
      Bpm: 110.54,
    },
    {
      Id: 636,
      Title: "Better Than That",
      Duration: 233,
      Artist: { Id: 636, Name: "Paris Working" },
      Preview:
        "https://cdns-preview-8.dzcdn.net/stream/c-80bb51ecbe17fa5a4e5fe7538ea647c2-1.mp3",
      Album: {
        Id: 636,
        Title: "The Cradle (EP)",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/0f82209fae9b8759e56caf08ab327fd8/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "0000-00-00",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/40208591",
      Bpm: 0,
    },
    {
      Id: 637,
      Title: "Dream Lover",
      Duration: 102,
      Artist: { Id: 637, Name: "dr tom butt" },
      Preview:
        "https://cdns-preview-7.dzcdn.net/stream/c-7a95340ca992ab2b319f9d7948cef8ce-2.mp3",
      Album: {
        Id: 637,
        Title: "rockin with the doc",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/573b7f4e95c65833c48c386b25b23fae/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2003-01-01",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/9735823",
      Bpm: 105,
    },
    {
      Id: 638,
      Title: "Lupercalia",
      Duration: 273,
      Artist: { Id: 638, Name: "Sadistik Exekution" },
      Preview:
        "https://cdns-preview-1.dzcdn.net/stream/c-10020c5835a318edb40ce63edd4f2185-5.mp3",
      Album: {
        Id: 638,
        Title: "The Magus",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/cacaf1a5fdf479c89e0a09371d148d32/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2008-07-01",
      DeezerRank: 31458,
      DeezerLink: "https://www.deezer.com/track/1090942",
      Bpm: 154,
    },
    {
      Id: 639,
      Title: "Jimmy Brown the Newsboy",
      Duration: 0,
      Artist: { Id: 639, Name: "Foster & Allen" },
      Preview:
        "https://cdns-preview-d.dzcdn.net/stream/c-d8fe915c4628199eec52f0895f47ed4d-0.mp3",
      Album: {
        Id: 639,
        Title: "Greatest Hits",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/af6a381936f79006559b52de8d387e2c/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "1998-07-14",
      DeezerRank: 2750,
      DeezerLink: "https://www.deezer.com/track/22063031",
      Bpm: 125,
    },
    {
      Id: 640,
      Title: "Pistol Packin' Mama",
      Duration: 304,
      Artist: { Id: 640, Name: "Jimmie Lunceford" },
      Preview:
        "https://cdns-preview-9.dzcdn.net/stream/c-9a8f286184dfa906ad1a6517ac83ea29-0.mp3",
      Album: {
        Id: 640,
        Title: "1943-45 Broadcasts",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/48b09d116fcaccbd4ce651e4f8016047/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2006-12-01",
      DeezerRank: 11622,
      DeezerLink: "https://www.deezer.com/track/11191278",
      Bpm: 0,
    },
    {
      Id: 641,
      Title: "Om Shanti Om",
      Duration: 384,
      Artist: { Id: 641, Name: "Sheila Chandra" },
      Preview:
        "https://cdns-preview-e.dzcdn.net/stream/c-ef3e8bcd9cda91e8bed05ec7792ccc2a-3.mp3",
      Album: {
        Id: 641,
        Title: "The Struggle",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/98cac2f9ff91de8f67aeccaba424b809/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-09-25",
      DeezerRank: 29187,
      DeezerLink: "https://www.deezer.com/track/62057548",
      Bpm: 71,
    },
    {
      Id: 642,
      Title: "(Blue) By Myself",
      Duration: 158,
      Artist: { Id: 642, Name: "Aretha Franklin" },
      Preview:
        "https://cdns-preview-5.dzcdn.net/stream/c-5a69bd744fbd23e32d1db49661ce5ad1-1.mp3",
      Album: {
        Id: 642,
        Title: "Early Years - The Absolutely Essential Collection",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/b81f2eba90820697a202ef2237f802ea/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-08-25",
      DeezerRank: 18632,
      DeezerLink: "https://www.deezer.com/track/86057773",
      Bpm: 156.61,
    },
    {
      Id: 643,
      Title: "Ultimate Mainboard",
      Duration: 11,
      Artist: { Id: 643, Name: "Inverse Phase" },
      Preview:
        "https://cdns-preview-0.dzcdn.net/stream/c-08ec223fba219bd6068197074d2bdfa7-2.mp3",
      Album: {
        Id: 643,
        Title: "The Chipping of Isaac",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/4531c58481b92bb3d6ffbde9757ed94a/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-11-16",
      DeezerRank: 6802,
      DeezerLink: "https://www.deezer.com/track/90496559",
      Bpm: 0,
    },
    {
      Id: 644,
      Title: "Bad Luck Roy",
      Duration: 162,
      Artist: { Id: 644, Name: "John Lisi & Delta Funk" },
      Preview:
        "https://cdns-preview-9.dzcdn.net/stream/c-990c23494410c7a11a681352898763ec-1.mp3",
      Album: {
        Id: 644,
        Title: "Dead Cat Bounce",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/2d356f4d258f412ea045a51faf6eec4d/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-01-29",
      DeezerRank: 7,
      DeezerLink: "https://www.deezer.com/track/30491341",
      Bpm: 119,
    },
    {
      Id: 645,
      Title: "Gongs in the Rain",
      Duration: 107,
      Artist: { Id: 645, Name: "Nesta Kerin Crain" },
      Preview:
        "https://cdns-preview-9.dzcdn.net/stream/c-95d90618a613808547c955b186f83ed5-0.mp3",
      Album: {
        Id: 645,
        Title:
          "I Am The Center: Private Issue New Age Music In America, 1950-1990 (Various Artists)",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/daa164e8f20d84d72d5f594833da1f9b/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2013-10-31",
      DeezerRank: 1,
      DeezerLink: "https://www.deezer.com/track/71530484",
      Bpm: 119,
    },
    {
      Id: 646,
      Title: "Solo Quiero Amarte",
      Duration: 327,
      Artist: { Id: 646, Name: "Reyes De Cancion" },
      Preview:
        "https://cdns-preview-9.dzcdn.net/stream/c-96b3258e00d603ce291862309561c8d4-1.mp3",
      Album: {
        Id: 646,
        Title: "Drew's Famous #1 Latin Karaoke Hits: Sing Like Ricky Martin",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/276b155974bb9145bb25603a76e744d7/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2011-05-17",
      DeezerRank: 21257,
      DeezerLink: "https://www.deezer.com/track/10702902",
      Bpm: 0,
    },
    {
      Id: 647,
      Title: "Your Ass is Grass... and Worthless Is the Lawnmower",
      Duration: 165,
      Artist: { Id: 647, Name: "Worthless United" },
      Preview:
        "https://cdns-preview-9.dzcdn.net/stream/c-9e25bf03fba583e49e3e431a2b252140-0.mp3",
      Album: {
        Id: 647,
        Title: "Which Side Are You On",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/6a9997a3c3a116afbcfa9e17a7b61123/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2012-02-14",
      DeezerRank: 4496,
      DeezerLink: "https://www.deezer.com/track/16294667",
      Bpm: 0,
    },
    {
      Id: 648,
      Title: "Lionheart (Remastered Version)",
      Duration: 272,
      Artist: { Id: 648, Name: "Grave Digger" },
      Preview:
        "https://cdns-preview-e.dzcdn.net/stream/c-e85bb417e7465e522a772e8545ee931d-4.mp3",
      Album: {
        Id: 648,
        Title: "Knights Of The Cross (Remastered 2006)",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/a37ae3a64908cce7eabe5dc43feb21e9/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2006-11-10",
      DeezerRank: 171482,
      DeezerLink: "https://www.deezer.com/track/13331027",
      Bpm: 130,
    },
    {
      Id: 649,
      Title: "Do It (feat. Thunder & Co) (Portland Radio Edit)",
      Duration: 409,
      Artist: { Id: 649, Name: "kaspar" },
      Preview:
        "https://cdns-preview-9.dzcdn.net/stream/c-9827e27d599f84877e6645e50c898e2a-0.mp3",
      Album: {
        Id: 649,
        Title: "Do It",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/efe2dfc8356e5683954d47b72bd3e23a/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "0000-00-00",
      DeezerRank: 7167,
      DeezerLink: "https://www.deezer.com/track/83217884",
      Bpm: 0,
    },
    {
      Id: 650,
      Title: "Garden Gates",
      Duration: 169,
      Artist: { Id: 650, Name: "Four Chords of Wood" },
      Preview:
        "https://cdns-preview-8.dzcdn.net/stream/c-890c7cddbf378a27326ed071b7fd217d-0.mp3",
      Album: {
        Id: 650,
        Title: "Temptation",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/6b6058d1ee16ed45f0bacee0ae0ff596/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2006-01-01",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/9612847",
      Bpm: 0,
    },
    {
      Id: 651,
      Title: "Nobelium",
      Duration: 286,
      Artist: { Id: 651, Name: "Solxis" },
      Preview:
        "https://cdns-preview-b.dzcdn.net/stream/c-b0d8107d4868a14ef6fd1521350000a6-0.mp3",
      Album: {
        Id: 651,
        Title: "Elements, Vol. 1-4",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/038249170b7a94dacec7d2107c3b16b4/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "0000-00-00",
      DeezerRank: 17829,
      DeezerLink: "https://www.deezer.com/track/76820623",
      Bpm: 0,
    },
    {
      Id: 652,
      Title: "Learning the Game",
      Duration: 133,
      Artist: { Id: 652, Name: "Buddy Holly" },
      Preview:
        "https://cdns-preview-2.dzcdn.net/stream/c-2355c15413068ada2039d0c9b4dba044-6.mp3",
      Album: {
        Id: 652,
        Title: "Buddy Holly in Christmas Wonderland",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/3d79f096b3e3c84cf8b94a80c76cf7dd/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2013-11-05",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/70291415",
      Bpm: 108,
    },
    {
      Id: 653,
      Title: "Hi-Fly",
      Duration: 560,
      Artist: { Id: 653, Name: "Herbie Hancock" },
      Preview:
        "https://cdns-preview-f.dzcdn.net/stream/c-f6774280576c6a6c0eab3a47403143b7-3.mp3",
      Album: {
        Id: 653,
        Title: "The Maze",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/397b8a7adcebe721e11f3f7c8f3be30d/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2003-09-15",
      DeezerRank: 11437,
      DeezerLink: "https://www.deezer.com/track/75351562",
      Bpm: 128,
    },
    {
      Id: 654,
      Title: "Gotas de Lluvia (Raindrops) (Remasterizado)",
      Duration: 174,
      Artist: { Id: 654, Name: "Enrique Guzman" },
      Preview:
        "https://cdns-preview-3.dzcdn.net/stream/c-3214a622a226ed96cc2f4101eab2fab9-2.mp3",
      Album: {
        Id: 654,
        Title: "Serie De Coleccion 15 Autenticos Exitos - Enrique Guzman",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/5b6db47f58a0a2932db6800a30e094d0/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "1991-10-16",
      DeezerRank: 197208,
      DeezerLink: "https://www.deezer.com/track/13268063",
      Bpm: 116.1,
    },
    {
      Id: 655,
      Title: "Clase Social",
      Duration: 276,
      Artist: { Id: 655, Name: "Adolescentes Orquesta" },
      Preview:
        "https://cdns-preview-8.dzcdn.net/stream/c-8b1f7a15d1f67964a4d44d090b8f1f05-5.mp3",
      Album: {
        Id: 655,
        Title: "Persona Ideal",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/fb2b4941a079b860dec8ff71399809a7/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2015-02-20",
      DeezerRank: 282118,
      DeezerLink: "https://www.deezer.com/track/60940489",
      Bpm: 103.6,
    },
    {
      Id: 656,
      Title: "I Saw Mommy Kissing Santa Claus",
      Duration: 139,
      Artist: { Id: 656, Name: "The Platters" },
      Preview:
        "https://cdns-preview-4.dzcdn.net/stream/c-477532e3e69d2fd660b5a7c130e3d6ce-2.mp3",
      Album: {
        Id: 656,
        Title: "100 Best : The Songs of Christmas",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/4fd211e04661496b0d26a38fc81ce300/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2015-02-08",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/63187794",
      Bpm: 0,
    },
    {
      Id: 657,
      Title: "Sunya",
      Duration: 586,
      Artist: { Id: 657, Name: "Maggie Diaz Del Castillo" },
      Preview:
        "https://cdns-preview-c.dzcdn.net/stream/c-ccb95289d7e5e2f5e6ab7c2b5ae9ec42-2.mp3",
      Album: {
        Id: 657,
        Title:
          "Donna D'Cruz & Rasa Living Present: Spring Equinox Reset - Meditations to Reawaken Your Spirit",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/a1c2dbaaf0e7e720a9335014f9444933/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-03-25",
      DeezerRank: 4828,
      DeezerLink: "https://www.deezer.com/track/75953158",
      Bpm: 0,
    },
    {
      Id: 658,
      Title: "Take Me Home Tonight (Bassjackers Remix)",
      Duration: 288,
      Artist: { Id: 658, Name: "FNA" },
      Preview:
        "https://cdns-preview-b.dzcdn.net/stream/c-b5ce2b35a749a6fb6033806f5f1862ce-3.mp3",
      Album: {
        Id: 658,
        Title: "Take Me Home Tonight",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/82ca56019e4e52259d990d971ff46e53/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2011-06-13",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/14666302",
      Bpm: 0,
    },
    {
      Id: 659,
      Title: "Rakevet Arim",
      Duration: 184,
      Artist: { Id: 659, Name: "Danski" },
      Preview:
        "https://cdns-preview-5.dzcdn.net/stream/c-5c4a86572fbddd1bef73570963efe6ee-0.mp3",
      Album: {
        Id: 659,
        Title: "11",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/de05d57f7920877ff4089e7275ea6fdb/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "0000-00-00",
      DeezerRank: 11889,
      DeezerLink: "https://www.deezer.com/track/73106854",
      Bpm: 132.1,
    },
    {
      Id: 660,
      Title: "She Bops a Lot (Remastered)",
      Duration: 127,
      Artist: { Id: 660, Name: "Ronnie Pearson" },
      Preview:
        "https://cdns-preview-2.dzcdn.net/stream/c-2424f5d54e56685d7f8e15a549d21cbb-0.mp3",
      Album: {
        Id: 660,
        Title: "The Story Herald (Doxy Collection Remastered)",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/1e78c6b2d96d365343a775577c9d8fbf/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-07-20",
      DeezerRank: 4022,
      DeezerLink: "https://www.deezer.com/track/81989948",
      Bpm: 0,
    },
    {
      Id: 661,
      Title: "Tulkaa kotiin",
      Duration: 230,
      Artist: { Id: 661, Name: "Taisto Wesslin" },
      Preview:
        "https://cdns-preview-0.dzcdn.net/stream/c-0b1092d680af32117783c04d3528ac41-0.mp3",
      Album: {
        Id: 661,
        Title: "Taisto Wesslin ja kitara",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/782409e5c8d33fa3571f54a0e8907c37/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2013-06-14",
      DeezerRank: 16671,
      DeezerLink: "https://www.deezer.com/track/77839619",
      Bpm: 73,
    },
    {
      Id: 662,
      Title: "Krypton",
      Duration: 242,
      Artist: { Id: 662, Name: "Mr. Moods" },
      Preview:
        "https://cdns-preview-4.dzcdn.net/stream/c-45d2bb07fddca2883b3f041582ec74a6-1.mp3",
      Album: {
        Id: 662,
        Title: "Mysteries Of The Unknown",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/5ba67e0d186481aebcda205bf27d92e9/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-02-21",
      DeezerRank: 10342,
      DeezerLink: "https://www.deezer.com/track/67309205",
      Bpm: 0,
    },
    {
      Id: 663,
      Title: "Always True (Piano)",
      Duration: 125,
      Artist: { Id: 663, Name: "Emily Bear" },
      Preview:
        "https://cdns-preview-3.dzcdn.net/stream/c-3e239817cc88668fb961f5be51e90210-1.mp3",
      Album: {
        Id: 663,
        Title: "Always True",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/18684307d18f853e9bf186d9bcfe433b/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2009-10-30",
      DeezerRank: 26976,
      DeezerLink: "https://www.deezer.com/track/9709262",
      Bpm: 137.8,
    },
    {
      Id: 664,
      Title: "Amor Serrano",
      Duration: 252,
      Artist: { Id: 664, Name: "Luis Felipe Gonzalez" },
      Preview:
        "https://cdns-preview-9.dzcdn.net/stream/c-90c4e4ccb24b88f9a00c946380777708-2.mp3",
      Album: {
        Id: 664,
        Title: "Pasion y Amor Con Salsa",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/13fb8c72a133e8863e03d683b5473928/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2020-01-29",
      DeezerRank: 33124,
      DeezerLink: "https://www.deezer.com/track/79327693",
      Bpm: 110.8,
    },
    {
      Id: 665,
      Title: "Crown Him with Many Crowns",
      Duration: 113,
      Artist: { Id: 665, Name: "The Christian Salvation Band of Joy" },
      Preview:
        "https://cdns-preview-b.dzcdn.net/stream/c-b6281ba3f081e94be7daa84c84665bdf-0.mp3",
      Album: {
        Id: 665,
        Title: "Jesus Loves You All - Classic Christian Music",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/98d0b07f41e534f7f3ab65d1bc875fe9/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-08-11",
      DeezerRank: 4897,
      DeezerLink: "https://www.deezer.com/track/78700229",
      Bpm: 0,
    },
    {
      Id: 666,
      Title: "Wanda My Woman",
      Duration: 191,
      Artist: { Id: 666, Name: "Hector's Nectar" },
      Preview:
        "https://cdns-preview-0.dzcdn.net/stream/c-00419d9887bea2feb7bfa1de3d2fed91-1.mp3",
      Album: {
        Id: 666,
        Title: "Orange",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/496a12ad96866ca4068d2b36bfdb2682/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-09-08",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/75259252",
      Bpm: 90,
    },
    {
      Id: 667,
      Title: "Messages",
      Duration: 196,
      Artist: { Id: 667, Name: "Filthy Dukes" },
      Preview:
        "https://cdns-preview-a.dzcdn.net/stream/c-a2f138f1533cc4018d29211d802b719f-3.mp3",
      Album: {
        Id: 667,
        Title: "Nonsense In The Dark (International Version)",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/50840083daed3cd589faf3423b4789a0/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2009-03-30",
      DeezerRank: 21077,
      DeezerLink: "https://www.deezer.com/track/7275028",
      Bpm: 124.9,
    },
    {
      Id: 668,
      Title: "Feels like heaven",
      Duration: 200,
      Artist: { Id: 668, Name: "Marc Saunders" },
      Preview:
        "https://cdns-preview-9.dzcdn.net/stream/c-964aa4624b250054778a3d0fdbe052cf-0.mp3",
      Album: {
        Id: 668,
        Title: "Brand new toy",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/66e51287f0d5e7ac80f9834b86cedf63/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2008-08-05",
      DeezerRank: 15140,
      DeezerLink: "https://www.deezer.com/track/15464278",
      Bpm: 122,
    },
    {
      Id: 669,
      Title: "Praise Him",
      Duration: 184,
      Artist: { Id: 669, Name: "Kent Henry" },
      Preview:
        "https://cdns-preview-3.dzcdn.net/stream/c-37edc56fb5e299b8d93509f03a5227ff-4.mp3",
      Album: {
        Id: 669,
        Title: "In His Presence",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/1bb6931ac37453058b3b315aa6aaf0cb/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-05-11",
      DeezerRank: 70793,
      DeezerLink: "https://www.deezer.com/track/78275682",
      Bpm: 146.09,
    },
    {
      Id: 670,
      Title: "Look At Me (Album Version Explicit)",
      Duration: 240,
      Artist: { Id: 670, Name: "Lil Wayne" },
      Preview:
        "https://cdns-preview-a.dzcdn.net/stream/c-ad9f6e282384bc0b028b64862fe8d6d6-5.mp3",
      Album: {
        Id: 670,
        Title: "500 Degreez",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/616a365daea033f19da73a5593b1e978/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2002-07-23",
      DeezerRank: 83240,
      DeezerLink: "https://www.deezer.com/track/1562218",
      Bpm: 99.6,
    },
    {
      Id: 671,
      Title: "Moment of Truth (Skit)",
      Duration: 29,
      Artist: { Id: 671, Name: "Man Of Booom" },
      Preview:
        "https://cdns-preview-8.dzcdn.net/stream/c-8c317b9a728892652c9b7922ea3922ed-0.mp3",
      Album: {
        Id: 671,
        Title: "Back to the Booom",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/6725869fe8b6712c243b49b6c4979097/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2013-10-20",
      DeezerRank: 10677,
      DeezerLink: "https://www.deezer.com/track/78523979",
      Bpm: 92,
    },
    {
      Id: 672,
      Title: "In The Air",
      Duration: 244,
      Artist: { Id: 672, Name: "Hazardous" },
      Preview:
        "https://cdns-preview-1.dzcdn.net/stream/c-1b9f950abca0bc69e92a47edb4ecb2c7-1.mp3",
      Album: {
        Id: 672,
        Title: "Genuine",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/02529776a759ebd269358b52a178bbc3/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "0000-00-00",
      DeezerRank: 24832,
      DeezerLink: "https://www.deezer.com/track/76949931",
      Bpm: 95.9,
    },
    {
      Id: 673,
      Title: "What Do I Care (Remastered)",
      Duration: 127,
      Artist: { Id: 673, Name: "Johnny Cash" },
      Preview:
        "https://cdns-preview-f.dzcdn.net/stream/c-f1f2f40bb096e3ddc67a4aac519f0b50-3.mp3",
      Album: {
        Id: 673,
        Title: "Simply Johnny Cash (Remastered)",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/d12da5b0bf3407e0964f2ce545ba28e1/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "0000-00-00",
      DeezerRank: 2,
      DeezerLink: "https://www.deezer.com/track/73402932",
      Bpm: 88.4,
    },
    {
      Id: 674,
      Title: "Take this hammer",
      Duration: 210,
      Artist: { Id: 674, Name: "Ken Colyer Skiffle group" },
      Preview:
        "https://cdns-preview-2.dzcdn.net/stream/c-28500d8ec221b3579eb3af1f1a4031af-2.mp3",
      Album: {
        Id: 674,
        Title: "Great British Skiffle - Just about as good as it gets",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/ec9609d83543c0732ba55a154f968c73/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2007-02-19",
      DeezerRank: 3843,
      DeezerLink: "https://www.deezer.com/track/10731311",
      Bpm: 114,
    },
    {
      Id: 675,
      Title: "Sapho: Act II, A l'ouvrage",
      Duration: 198,
      Artist: { Id: 675, Name: "National Philarmonic Orchestra of Belarus" },
      Preview:
        "https://cdns-preview-8.dzcdn.net/stream/c-80ee36592c11923af3410f5e6506894b-1.mp3",
      Album: {
        Id: 675,
        Title: "Jules Massenet: Sapho",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/1c04bbd83160aa8088c39548a90113e6/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-07-23",
      DeezerRank: 48138,
      DeezerLink: "https://www.deezer.com/track/6742872",
      Bpm: 92,
    },
    {
      Id: 676,
      Title: "Parate y Mira",
      Duration: 186,
      Artist: { Id: 676, Name: "La Gata Panda" },
      Preview:
        "https://cdns-preview-5.dzcdn.net/stream/c-5c7df0dd26f6f28de9c9e7195ad020da-3.mp3",
      Album: {
        Id: 676,
        Title: "Macarena",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/21cebb9966ea1a17baaa77e681112957/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2011-08-06",
      DeezerRank: 25444,
      DeezerLink: "https://www.deezer.com/track/6685122",
      Bpm: 95,
    },
    {
      Id: 677,
      Title: "Mocny",
      Duration: 313,
      Artist: { Id: 677, Name: "Krafcy" },
      Preview:
        "https://cdns-preview-7.dzcdn.net/stream/c-7f05ddac5c8095f0b37f1433348c4ef2-2.mp3",
      Album: {
        Id: 677,
        Title: "eF (0)",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/e998d604133aac8472ab2bf8db61b22e/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2010-01-27",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/69038575",
      Bpm: 0,
    },
    {
      Id: 678,
      Title: "Nardis",
      Duration: 287,
      Artist: { Id: 678, Name: "Steve Wiest" },
      Preview:
        "https://cdns-preview-d.dzcdn.net/stream/c-dee2e6b349b0ca772da5fb8b9e903537-1.mp3",
      Album: {
        Id: 678,
        Title: "Deja Vu Memories of Paris",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/58b050546f61b40c6e70f01551e85df8/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2010-07-09",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/6789216",
      Bpm: 0,
    },
    {
      Id: 679,
      Title: "Groovy Night",
      Duration: 162,
      Artist: { Id: 679, Name: "Tedjep Soulful House" },
      Preview:
        "https://cdns-preview-9.dzcdn.net/stream/c-94c045002f21de173148fc70f27a7635-0.mp3",
      Album: {
        Id: 679,
        Title: "38 Best Chillhouse Produces of Ted Peters",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/b2cc15543b2c06954e6eb2fddbf58e54/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2015-04-29",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/99551556",
      Bpm: 0,
    },
    {
      Id: 680,
      Title:
        "Heartlight (Karaoke Version) (Originally Performed By Neil Diamond)",
      Duration: 248,
      Artist: { Id: 680, Name: "Albert 2 Stone" },
      Preview:
        "https://cdns-preview-8.dzcdn.net/stream/c-8c78b54da32cadaf97132af005021a22-0.mp3",
      Album: {
        Id: 680,
        Title: "Greatest Karaoke Hits, Vol. 438 (Karaoke Version)",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/9a7157ef9c9fe83d7fa1b31d99b27cbd/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-05-09",
      DeezerRank: 5444,
      DeezerLink: "https://www.deezer.com/track/78344118",
      Bpm: 128,
    },
    {
      Id: 681,
      Title: "No Breakin Up (Instrumental)",
      Duration: 201,
      Artist: { Id: 681, Name: "G-Va" },
      Preview:
        "https://cdns-preview-d.dzcdn.net/stream/c-d2645d3522d97e34e078666997f0144e-4.mp3",
      Album: {
        Id: 681,
        Title: "No Breakin Up",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/471903c3598e68e1f20b3246fa9f3e0b/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-07-11",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/52424801",
      Bpm: 116,
    },
    {
      Id: 682,
      Title: "Daybreak",
      Duration: 310,
      Artist: { Id: 682, Name: "Marc Vee" },
      Preview:
        "https://cdns-preview-b.dzcdn.net/stream/c-b0e499c285b4930c7ff6126234eaa388-1.mp3",
      Album: {
        Id: 682,
        Title: "Path to Serenity",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/58a33e6a1e67731228c4f97493448a78/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-09-05",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/75858740",
      Bpm: 85,
    },
    {
      Id: 683,
      Title: "The Lord's Prayer",
      Duration: 217,
      Artist: { Id: 683, Name: "Royal Wedding Orchestra" },
      Preview:
        "https://cdns-preview-b.dzcdn.net/stream/c-bafa301c602ba325ccd6a0ef23f3c94a-1.mp3",
      Album: {
        Id: 683,
        Title:
          "Once Upon a Time - Fairytale Wedding Classics for Princess Brides & Their Prince Charmings",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/f576341254059934199afc10b4150252/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-01-28",
      DeezerRank: 21692,
      DeezerLink: "https://www.deezer.com/track/27761921",
      Bpm: 81.7,
    },
    {
      Id: 684,
      Title: "III. Scherzo: Vivace",
      Duration: 390,
      Artist: { Id: 684, Name: "New Budapest Quartet" },
      Preview:
        "https://cdns-preview-4.dzcdn.net/stream/c-49c79a994d10327aa5ca77ac51aaa8be-2.mp3",
      Album: {
        Id: 684,
        Title: "Spohr: Complete String Quartets, Vol. 15",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/dae88e442d11a36de67be766feae4656/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2012-02-07",
      DeezerRank: 7,
      DeezerLink: "https://www.deezer.com/track/16616608",
      Bpm: 0,
    },
    {
      Id: 685,
      Title: "Harakat",
      Duration: 229,
      Artist: { Id: 685, Name: "Sena Al Fares" },
      Preview:
        "https://cdns-preview-4.dzcdn.net/stream/c-4f72f75fc5377a68a6e73acbbef0f31b-1.mp3",
      Album: {
        Id: 685,
        Title: "Sena 2013",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/9face50eff0bf2ab4abda7cccbf254f5/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2013-06-13",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/68013109",
      Bpm: 0,
    },
    {
      Id: 686,
      Title: "Warm-Ups 4",
      Duration: 55,
      Artist: { Id: 686, Name: "Michael Supnick" },
      Preview:
        "https://cdns-preview-5.dzcdn.net/stream/c-5da353c26043dc9c2bcbcad0675943e5-0.mp3",
      Album: {
        Id: 686,
        Title: "Trumpet Lessons",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/6af4308aea8eaac684ca00df4f1e26ec/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2013-11-01",
      DeezerRank: 12,
      DeezerLink: "https://www.deezer.com/track/65153742",
      Bpm: 0,
    },
    {
      Id: 687,
      Title: "Nice Work If You Can Get It",
      Duration: 157,
      Artist: { Id: 687, Name: "Ella Fitzgerald" },
      Preview:
        "https://cdns-preview-d.dzcdn.net/stream/c-d314b2183202128a17e5eef9b15951c1-5.mp3",
      Album: {
        Id: 687,
        Title: "Sing Songs With Swing (Original Recordings)",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/0ea5db5823da8630e5bf3e85bea38268/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2015-01-14",
      DeezerRank: 10243,
      DeezerLink: "https://www.deezer.com/track/69610420",
      Bpm: 118,
    },
    {
      Id: 688,
      Title:
        "The Whiskey Ain't Workin' (In the Style of Marty Stuart & Travis Tritt) [Karaoke Version]",
      Duration: 165,
      Artist: { Id: 688, Name: "Ameritz - Karaoke" },
      Preview:
        "https://cdns-preview-b.dzcdn.net/stream/c-b6bd457d867dcaabb2544464f9ca0535-2.mp3",
      Album: {
        Id: 688,
        Title: "Karaoke - Marty Stuart",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/7e045a99ae895e842727676afd343703/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2012-05-01",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/40047231",
      Bpm: 123,
    },
    {
      Id: 689,
      Title: "Con te (Fox)",
      Duration: 164,
      Artist: { Id: 689, Name: "Gruppo Musica e Allegria" },
      Preview:
        "https://cdns-preview-b.dzcdn.net/stream/c-b54ea6e387d516c777d5c9d8c2628620-2.mp3",
      Album: {
        Id: 689,
        Title: "Alla luna",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/9d65c7365168333e75fedaa50068484e/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2011-06-11",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/12459656",
      Bpm: 87,
    },
    {
      Id: 690,
      Title: "Bombay",
      Duration: 171,
      Artist: { Id: 690, Name: "Sonny Stitt All Stars" },
      Preview:
        "https://cdns-preview-e.dzcdn.net/stream/c-ed518acedb7befdef4f613e3988e63ea-2.mp3",
      Album: {
        Id: 690,
        Title: "Boundless Glee",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/a1eb090b4977911eea24bd2a0e222ffc/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2011-05-20",
      DeezerRank: 2285,
      DeezerLink: "https://www.deezer.com/track/95838098",
      Bpm: 84.5,
    },
    {
      Id: 691,
      Title: "Somewhere My Love",
      Duration: 134,
      Artist: { Id: 691, Name: "The Love Band" },
      Preview:
        "https://cdns-preview-3.dzcdn.net/stream/c-300bc85503ddc4a53bb63cc8dcca9d05-3.mp3",
      Album: {
        Id: 691,
        Title: "The Best Love Songs",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/c171e5f6cdf54745e03016486d953423/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2015-02-04",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/63585889",
      Bpm: 0,
    },
    {
      Id: 692,
      Title: "Griswold",
      Duration: 190,
      Artist: { Id: 692, Name: "1in2" },
      Preview:
        "https://cdns-preview-1.dzcdn.net/stream/c-14be34f0c05d324311b8f0c499576b39-0.mp3",
      Album: {
        Id: 692,
        Title: "Creature Ventures",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/e589897053d97d21125a7a4835757b95/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-08-16",
      DeezerRank: 3846,
      DeezerLink: "https://www.deezer.com/track/83547602",
      Bpm: 0,
    },
    {
      Id: 693,
      Title: "I Feel Remorse No Anger",
      Duration: 223,
      Artist: { Id: 693, Name: "From Day To Day" },
      Preview:
        "https://cdns-preview-2.dzcdn.net/stream/c-2978ca05ff505c90958adcd487c947c0-3.mp3",
      Album: {
        Id: 693,
        Title: "To: Humans",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/8218c81e90748b32dc5f7a4e40e9dbd7/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2015-01-15",
      DeezerRank: 3,
      DeezerLink: "https://www.deezer.com/track/93505388",
      Bpm: 0,
    },
    {
      Id: 694,
      Title: "The World in Translation",
      Duration: 305,
      Artist: { Id: 694, Name: "Ayelet Rose Gottlieb" },
      Preview:
        "https://cdns-preview-6.dzcdn.net/stream/c-67ccf950d60d94bf9d8fb3fdb5a90202-2.mp3",
      Album: {
        Id: 694,
        Title: "Roadsides",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/7689eb08b662b6ec7a6f38c0057099f0/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-11-23",
      DeezerRank: 6979,
      DeezerLink: "https://www.deezer.com/track/90891513",
      Bpm: 0,
    },
    {
      Id: 695,
      Title: "Fur Elise",
      Duration: 188,
      Artist: { Id: 695, Name: "Bruce Hungerford, piano" },
      Preview:
        "https://cdns-preview-e.dzcdn.net/stream/c-ed4316023ca6b00c718c1ba168211c34-0.mp3",
      Album: {
        Id: 695,
        Title: "The Best Beethoven",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/6792fa927887b2e13e454f2eb652851f/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2013-03-30",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/65929205",
      Bpm: 0,
    },
    {
      Id: 696,
      Title: "I'll Do it All over Again",
      Duration: 171,
      Artist: { Id: 696, Name: "SingLike" },
      Preview:
        "https://cdns-preview-4.dzcdn.net/stream/c-44505843d6cc5427e6eafe5f4153b57e-0.mp3",
      Album: {
        Id: 696,
        Title: "I'll Do it All over Again - Single",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/3e1e2e2bf2bc299430c574f2e22c1379/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "0000-00-00",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/76884413",
      Bpm: 0,
    },
    {
      Id: 697,
      Title: "Seasons",
      Duration: 192,
      Artist: { Id: 697, Name: "Like A Secret Seen" },
      Preview:
        "https://cdns-preview-0.dzcdn.net/stream/c-0f65e0cd5b57e8cf1911d7a50ea95675-2.mp3",
      Album: {
        Id: 697,
        Title: "Seasons",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/703ebcbfb767854dc08f30b5302f11a4/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2014-11-01",
      DeezerRank: 4,
      DeezerLink: "https://www.deezer.com/track/89428037",
      Bpm: 140,
    },
    {
      Id: 698,
      Title: "Your Love O God",
      Duration: 302,
      Artist: { Id: 698, Name: "The Three Magi" },
      Preview:
        "https://cdns-preview-f.dzcdn.net/stream/c-fa7832a67d6b0c210c5c635a19d45259-4.mp3",
      Album: {
        Id: 698,
        Title: "Merry Christmas (Joyfully and Traditionally)",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/8fb11d9734bfe6d652198ca3b0485d98/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2012-12-10",
      DeezerRank: 0,
      DeezerLink: "https://www.deezer.com/track/61611970",
      Bpm: 0,
    },
    {
      Id: 699,
      Title: "Peg O' My Heart",
      Duration: 182,
      Artist: { Id: 699, Name: "George Siravo & His Orchestra" },
      Preview:
        "https://cdns-preview-7.dzcdn.net/stream/c-74cf69909ca339effb1b54d304999f1a-0.mp3",
      Album: {
        Id: 699,
        Title: "Seductive Strings By Siravo",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/f77b0390c6d1f3291c640422c2885eb8/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2018-11-06",
      DeezerRank: 15935,
      DeezerLink: "https://www.deezer.com/track/97594672",
      Bpm: 0,
    },
    {
      Id: 700,
      Title: "Kenn nicht deinen Namen (Scheissegal) (Party Hit Version 2009)",
      Duration: 191,
      Artist: { Id: 700, Name: "DJ Hulpa" },
      Preview:
        "https://cdns-preview-b.dzcdn.net/stream/c-b247edcfbea3b9d14dcc94cd6fd3fdfe-20.mp3",
      Album: {
        Id: 700,
        Title:
          "Mallorca ist verliebt in der falsches schöne Mädchen (Es gibt keine falsche Hits für das Apres Ski Hits 2015 und Karneval 2015 bis 2016 Schlager Discofox",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/c82cba0fd3ac08233ef392364f8f63f3/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2015-02-01",
      DeezerRank: 22065,
      DeezerLink: "https://www.deezer.com/track/94492618",
      Bpm: 145,
    },
    {
      Id: 701,
      Title: "Thanks For The Memory",
      Duration: 193,
      Artist: { Id: 701, Name: "Bob Hope and Shirley Ross" },
      Preview:
        "https://cdns-preview-b.dzcdn.net/stream/c-b9f8b2ef8e028d60c66f018568cfdb0a-7.mp3",
      Album: {
        Id: 701,
        Title:
          "The Roots Of Rod Stewart - The Great American Songbook (1927 - 1944)",
        Cover_Big:
          "https://e-cdns-images.dzcdn.net/images/cover/29229d19dc9def6e5c78c94a7a639c33/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "2006-10-28",
      DeezerRank: 18251,
      DeezerLink: "https://www.deezer.com/track/3622799",
      Bpm: 76,
    },
    {
      Id: 702,
      Title: "Floorlifter (Leon Bolier Remix)",
      Duration: 331,
      Artist: { Id: 702, Name: "Rank 1" },
      Preview:
        "https://cdns-preview-c.dzcdn.net/stream/c-c3e236dbf319120254ccb7c5e029797a-0.mp3",
      Album: {
        Id: 702,
        Title: "Floorlifter",
        Cover_Big:
          "https://cdns-images.dzcdn.net/images/cover/32dcab80544de37ab4e40260ced0d0d0/500x500-000000-80-0-0.jpg",
      },
      User: null,
      ReleaseDate: "0000-00-00",
      DeezerRank: 3820,
      DeezerLink: "https://www.deezer.com/track/79604556",
      Bpm: 0,
    },
  ];
  tracksCopy = [...tracks];

  vw = getViewportWidth();
  setTracksOnPageNumber();

  createAllPageNumbers();
  rerender();

  setResizeListener();
  setControlsListeners();
};

export const goToPage = (pageNum) => {
  if (
    pageNum === 0 ||
    (pageNum >= 0 && pageNum <= (tracks.length - 1) / tracksOnPage)
  ) {
    currentPage = pageNum;
    rerender();
  }
};

const higlightCurrentPage = () => {
  $(`#pageNum${currentPage}`).addClass("bg-primary rounded");
};

const removeHighlightsFromPages = () => {
  $("#pages")
    .children()
    .each((i, child) => {
      $(child).removeClass("bg-primary");
    });
};

const createAllPageNumbers = () => {
  const pagesCount = Math.ceil(tracks.length / minTracksOnPage);
  for (let i = 0; i < pagesCount; i++) {
    $("#pages").append(
      `<span class="pageNum px-3 px-md-2 py-1 d-none" id="pageNum${i}">${i + 1}</span>`
    );
    $("#pages").append(
      `<span id="spread-between-page-nums${i}" class="d-none">...</span>`
    );
  }
};

const renderPageNumbers = () => {
  const pagesCount = Math.ceil(tracks.length / tracksOnPage);
  if (pagesCount <= 6) {
    showPageNumbers(
      Array.from(Array(pagesCount), (_, i) => (i + 1).toString())
    );
  } else if (currentPage <= 2) {
    showPageNumbers(["1", "2", "3", "4", "...", pagesCount.toString()]);
  } else if (currentPage >= pagesCount - 3)
    showPageNumbers([
      "1",
      "...",
      (pagesCount - 3).toString(),
      (pagesCount - 2).toString(),
      (pagesCount - 1).toString(),
      pagesCount.toString(),
    ]);
  else
    showPageNumbers([
      "1",
      "...",
      currentPage.toString(),
      (currentPage + 1).toString(),
      (currentPage + 2).toString(),
      "...",
      pagesCount.toString(),
    ]);
};

const hidePageNumbers = () => {
  $("#pages")
    .children()
    .each((i, child) => {
      $(child).addClass("d-none");
    });
};

const showPageNumbers = (pagesNumsValues) => {
  for (let i = 0; i < pagesNumsValues.length; i++) {
    if (isNaN(parseInt(pagesNumsValues[i])))
      $(`#spread-between-page-nums${pagesNumsValues[i - 1]}`).removeClass(
        "d-none"
      );
    else $(`#pageNum${pagesNumsValues[i] - 1}`).removeClass("d-none");
  }
};

const rerender = () => {
  clear();
  renderControlsAndTracks();
  hidePageNumbers();
  renderPageNumbers();
  removeHighlightsFromPages();
  higlightCurrentPage();
};

const renderControlsAndTracks = () => {
  if (tracks.length > 0) {
    $(".no-tracks-added-info").hide();
    showControls();
    const firstTrackOfCurrentPageIndex = currentPage * tracksOnPage;
    const lastTrackOfCurrentPageIndex = (currentPage + 1) * tracksOnPage;
    const firstTrackOfPrevPageIndex =
      firstTrackOfCurrentPageIndex - tracksOnPage;
    for (
      let i =
        firstTrackOfPrevPageIndex >= 0
          ? firstTrackOfPrevPageIndex
          : firstTrackOfCurrentPageIndex;
      i < lastTrackOfCurrentPageIndex + tracksOnPage && i < tracks.length;
      i++
    )
      insertTrackIntoHTML(
        i,
        tracks[i],
        i >= firstTrackOfCurrentPageIndex && i < lastTrackOfCurrentPageIndex
      );

    if (!dispatchedFirstTracksRendered) {
      dispatchedFirstTracksRendered = true;
      document.dispatchEvent(new Event("onFirstTracksRendered"));
    }
  }
};

const showControls = () => {
  if (!controls.is(":visible")) {
    controls.addClass("d-flex");
    controls.removeClass("d-none");
  }
};

const clear = () => {
  $("#track-list-container").empty();
};

const setResizeListener = () => {
  window.onresize = () => {
    let prevTracksOnPage = tracksOnPage;
    vw = getViewportWidth();
    setTracksOnPageNumber();

    if (prevTracksOnPage != tracksOnPage) {
      rerender();
    }
  };
};

const setTracksOnPageNumber = () => {
  if (vw < 576) tracksOnPage = Math.round((maxTracksOnPage * 1) / 4);
  else if (vw < 768) tracksOnPage = Math.round((maxTracksOnPage * 1) / 2);
  else if (vw < 992) tracksOnPage = Math.round((maxTracksOnPage * 3) / 4);
  else tracksOnPage = Math.round(maxTracksOnPage);
};

const setControlsListeners = () => {
  $("#nextPage").on("click", () => {
    goToPage(currentPage + 1);
  });

  $("#prevPage").on("click", () => {
    goToPage(currentPage - 1);
  });

  $(".pageNum").on("click", (pageNumElementEvent) => {
    goToPage(parseInt(pageNumElementEvent.target.innerHTML) - 1);
  });

  $("#go-to-page-input").on("input", (e) => {
    handleInputAfterDelay(e, pageInputSearchDelay, () => {
      goToPage(parseInt($(e.target).val()) - 1 || 0);
    });
  });

  $("#keyword-search-input").on("input", (e) => {
    handleInputAfterDelay(e, keywordInputSearchDelay, () => {
      keywordSeachHandler($(e.target).val());
    });
  });

  $("#sort-by").on("change", (e) => {
    selectSortingTypeHandler($(e.target).val());
  });

  $("#sort-ascending").on("click", () => {
    sortDirectionButtonHandler(true);
  });

  $("#sort-descending").on("click", () => {
    sortDirectionButtonHandler(false);
  });
};

const sortDirectionButtonHandler = (sortAsc) => {
  sortAscending = sortAsc;
  if (sortAsc) {
    $("#sort-ascending").addClass("text-primary");
    $("#sort-descending").removeClass("text-primary");
  } else {
    $("#sort-ascending").removeClass("text-primary");
    $("#sort-descending").addClass("text-primary");
  }
  selectSortingTypeHandler($("#sort-by").val());
};

const selectSortingTypeHandler = (sortingType) => {
  const keyword = $("#keyword-search-input").val();

  if (!keyword) {
    sortTracks(tracksCopy, sortingType);
    tracks = [...tracksCopy];
    rerender();
  } else {
    sortTracks(tracksCopy, sortingType);
    keywordSeachHandler(keyword, currentPage);
  }
};

const keywordSeachHandler = (keyword, pageNum = null) => {
  if (!keyword) {
    tracks = [...tracksCopy];
    goToPage(currentPage);
  } else {
    tracks = tracksCopy.filter((track) => {
      return (
        `${track.Title} ${track.Artist.Name} ${track.Album.Title} ${track.ReleaseDate}`
          .toLocaleLowerCase()
          .indexOf(keyword.toLocaleLowerCase()) >= 0
      );
    });
    goToPage(pageNum ? pageNum : 0);
  }
};

const handleInputAfterDelay = (e, delay, handler) => {
  let inputValue = $(e.target).val();

  setTimeout(() => {
    if (inputValue === $(e.target).val()) handler();
  }, delay);
};

const getPropertyFromStringPath = (obj, stringPath) => {
  return stringPath.split(".").reduce((p, c) => (p && p[c]) || null, obj);
};

export const deleteTrackFromMemory = (trackTitle) => {
  tracks = tracks.filter((track) => track.Title !== trackTitle);
  if (currentPage > Math.floor((tracks.length - 1) / tracksOnPage))
    goToPage(currentPage - 1);
  else rerender();
};

const sortTracks = (tracksToSort, sortingType) => {
  tracksToSort.sort((track1, track2) => {
    const propertyA = getPropertyFromStringPath(track1, sortingType);
    const propertyB = getPropertyFromStringPath(track2, sortingType);

    if (typeof propertyA === "string")
      return propertyA.localeCompare(propertyB);
    else return propertyA - propertyB;
  });

  if (!sortAscending) tracksToSort.reverse();
};

export const getTracksLength = () => {
  return tracks.length;
};
