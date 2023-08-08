# Serenity
A chrome extension to monitor and control your speech speed during presentations

## Installation
Serenity will be soon available on the Chrome Web Store, but for now you can download this repository and add it manually to your Google Chrome. Simply upload the whole folder. Make sure to use the Google Chrome Beta, as the Side Panel API is not yet available for the stable release.

## What it does

Video: `https://www.youtube.com/watch?v=CXMhdcRRdu8&ab_channel=JonathanS.`

Serenity is a chrome extension that uses Chome's side panel feature. When you hit the start button, it'll start recording you using the microphone. It will begin to show a live transcription as well. Every time you take a pause, perhaps between sentences, the speed of speech will update and provide cues on if you should slow down or keep going at the current pace. **You can stop recording by verbally stating,  'stop recording'**. The recording will then stop and display the full transcription of what you said.

The tool can help teachers keep pace and can help students practice/deliver presentations.

## Technologies
- Manifest V3
- Deepgram API
- Side Panel API (Chrome Beta)
- WebSocket
- HTML CSS JS
- Node
- Webpack 

## Examples
*Landing Page*
![Landing Page](https://cdn.discordapp.com/attachments/928022919337103393/1138345269335949332/pic1.jpg)

*Good Pace*
![Good Pace](https://cdn.discordapp.com/attachments/928022919337103393/1138345269608599592/pic2.jpg)

*Slow Down*
![Slow Down](https://cdn.discordapp.com/attachments/928022919337103393/1138345268992032819/pic5.jpg)

*Too Fast*
![Too Fast](https://cdn.discordapp.com/attachments/928022919337103393/1138345268597751920/pic4.jpg)

*Transcript Once Done*
![Landing Page](https://cdn.discordapp.com/attachments/928022919337103393/1138345268266418267/pic3.jpg)


## Inspiration
I was inspired to build this project because I have always struggled to keep up with teachers that speak somewhat fast. I've also zoned out a lot with some teachers who speak quite slowly. A lot of times, they may not be aware of it either. Moreover, students may not be able to comfortably tell the teacher to slow down. On the other hand, as a student myself, I struggle to make sure I am speaking at an appropriate pace. I have been told by peers and teachers that I speak too fast which could be a result of a multitude of factors such as nervousness or excitement.

## How I built it
I built it using **Manifest V3**, chrome's web extension API. I used the new beta **Side Panel API** to create a better experience. The Side panel is capable of allowing the recording to continue **no matter what window or tab you switch to.** The user interface was designed with **HTML CSS JS**. Natural language processing was done with **Deepgram's API**. I established a web socket between the extension and Deepgram which enabled the extension to relay raw recording data to the API and retrieve parsed information such as the duration of speech and words stated. Lastly, the extension was set into production using **Webpack** for bundling.

## Challenges I ran into
The major challenge I ran into was the fact that the Side Panel API is a very new Chrome feature. In fact, extensions can't even run it outside the Chrome Beta. Thankfully, the Chrome beta is publically available, so I was able to make use of the amazing feature. That being said, since the feature is so new, there are very few online resources to help out with development. As such, a lot of trial and error was involved as I had to come up with my own workarounds for never-before-seen situations. Thanfully, Google's documentation is very thorough and gave me the building blocks to work off of.

Another challenge I faced was accurately determining words per minute. I found that actually doing `words/minutes` was not effective and more often produced unreasonable results. Instead, I found the total number of characters spoken and divided it by five (the average English word is about 5 characters long). This produced a much more useful result.

## Accomplishments that I am proud of
I am particularly proud of the final product since I have never built a chrome extension before. Moreover, this is my first time using NLP, so I am proud that I could find a real-world application for it that can directly help me in my day-to-day life.

## What I learned
In terms of technologies, I learned how to use Manifest V3 as well as the Deepgram API, both of which I can see myself using again in the future.

In terms of non-technical lessons, I learned that it's always a great idea to sit back and brainstorm ideas and features before jumping right into programming.

## What's next for Serenity
Serenity is currently being reviewing by Google before being published onto the Chrome Web Store. As of right now, it can be downloaded from Github and manually added to your Chrome locally. Make sure you are using the Beta version as the Side Panel API is not yet available on the stable release of Chrome.

Serenity is **very scalable** and has a lot of room for growth. I am thinking of adding support for **other languages**. Moreover, I will also look into implementing it on **Safari**. Lastly, I can expand on the NLP portion of the project and explore **topic detection** to detect when the speaker is going off-topic.

