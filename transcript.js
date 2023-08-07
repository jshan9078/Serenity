/*global chrome*/
/* eslint-disable no-undef */




const button2 = document.getElementById('startRecording');
button2.addEventListener('click', async () => {
  chrome.tabs.query({active:true, currentWindow:true}, tabs=>{
    const activeTabId = tabs[0].id;
    chrome.scripting.executeScript({
      target: {tabId: activeTabId},
      function: getMic,
    })
  })
});


  const getMic = async() =>{
    navigator.mediaDevices.getUserMedia({ audio: true}).then((stream) =>{
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm',
      })
      const myPolicy = trustedTypes.createPolicy('mypolicy', {
        createScriptURL: s => s,
      })
      const trustedURL = myPolicy.createScriptURL('wss://api.deepgram.com/v1/listen').toString();
      const socket = new WebSocket(trustedURL, [
        'token',
        '9a8e2e80b50db851d539b6270239b710878f8877',
      ])
      var port = chrome.runtime.connect({name: "paths"});
      var spaths = 'Connected';
      port.postMessage({paths: spaths});
      socket.onopen = () => {
        mediaRecorder.addEventListener('dataavailable', async (event) => {
          if (event.data.size > 0 && socket.readyState == 1) {
            socket.send(event.data)
          }
        })
        mediaRecorder.start(10);
      }
      socket.onmessage = (message) => {
        const received = JSON.parse(message.data)
        const transcript = received.channel.alternatives[0].transcript;
        if (transcript){
          console.log(transcript);
          const durOfSpeechRaw = received.duration;
          const startOfSpeechRaw = received.start;
          const endOfSpeechRaw = durOfSpeechRaw+startOfSpeechRaw;
          const startOfSpeech = +startOfSpeechRaw.toFixed(0);
          const endOfSpeech = +endOfSpeechRaw.toFixed(0);
          const wordsArr = received.channel.alternatives[0].words;
          const wordCount = wordsArr.length;
          const characterCount=transcript.length-(wordCount-1);
          const adjustedWordCount = characterCount/6;
          const currentWPM = (adjustedWordCount/(durOfSpeechRaw/60)).toFixed(0);
          if (transcript==='stop recording'){
            socket.close();
            var endport = chrome.runtime.connect({name: "endpaths"});
            endport.postMessage({endpaths: 'close'});
          }
          else if (received.is_final){
            //const currentWPM = (wordCount/(durOfSpeechRaw/60)).toFixed(0);
            var wpmport = chrome.runtime.connect({name: "wpmpaths"});
            wpmport.postMessage({wpmpaths: currentWPM});
            var tempStart=''; 
            var tempEnd='';

            if (startOfSpeech>=60){
              if (startOfSpeech%60<10){
                tempStart= Math.floor(startOfSpeech/60).toFixed(0) + ":0" + (startOfSpeech%60).toFixed(0);
              }
              else{
                tempStart= Math.floor(startOfSpeech/60).toFixed(0) + ":" + (startOfSpeech%60).toFixed(0);
              }
            }
            else{
              if (startOfSpeech%60<10){
                tempStart= "0:0" + (startOfSpeech%60).toFixed(0);
              }
              else{
                tempStart= "0:" + (startOfSpeech%60).toFixed(0);
              }
            }

            if (endOfSpeech>=60){
              if (endOfSpeech%60<10){
                tempEnd= Math.floor(endOfSpeech/60).toFixed(0) + ":0" + (endOfSpeech%60).toFixed(0);
              }
              else{
                tempEnd= Math.floor(endOfSpeech/60).toFixed(0) + ":" + (endOfSpeech%60).toFixed(0);
              }
            }
            else{
              if (endOfSpeech%60<10){
                tempEnd= "0:0" + (endOfSpeech%60).toFixed(0);
              }
              else{
                tempEnd= "0:" + (endOfSpeech%60).toFixed(0);
              }
            }

            const timestamp = tempStart + " - " + tempEnd + " ";
            var transcriptport = chrome.runtime.connect({name: "transcriptpaths"});
            transcriptport.postMessage({transcriptpaths: [timestamp,transcript]});
          }
        }
      }
    }).catch(function (e){
      return alert('Please enable mic settings for the extension and refresh!');
    });
  };


