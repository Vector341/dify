Analyze the dify-web project in /web, answer how it design and implement multimodal input:

## Multi modal input
support text, image, file and video input

component:
ChatInputArea
FileList
Textarea from react-textarea-autosize

hooks:
web\app\components\base\file-uploader\hooks.ts - useFile
handleLocalFileUpload => fileUpload => xhr

HTML: 
FileReader


## Image preview
preview image and zoom in/out
createPortal - <img/>

## Voice-to-text
speech to text for input

record -- convert to mp3 file -- apps/id/audio-to-text

method:
handleShowVoiceInput

js-audio-recorder

component:
VoiceInput


## Format output
Basic-content.tsx Markdown.tsx
ReactMarkdown


## Syntax highlight
ReactMarkdown
react-syntax-highlighter