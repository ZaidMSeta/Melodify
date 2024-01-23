const video = document.querySelector("video")
const canvas = document.querySelector("canvas")

navigator.mediaDevices.getUserMedia({
  audio: false, 
  video: true
}).then(stream => {
  video.srcObject = stream
})

async function sendData(e) {
  const msg = document.querySelector("p")
  const btn = e.target

  canvas.getContext("2d").drawImage(video, 0, 0, 400, 300)
  btn.disabled = true

  const dataUri = canvas.toDataURL("image/jpeg", 0.9)
  const res = await fetch("/api/send-image", {
    method: "POST",
    body: JSON.stringify({dataUri}),
    headers: {
      "Content-Type": "application/json"
    }
  })
  const { name } = await res.json()
  msg.innerText = name
  btn.disabled = false
}