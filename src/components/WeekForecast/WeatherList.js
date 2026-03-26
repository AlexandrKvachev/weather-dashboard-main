import cloudyImg from "../../assets/clouds.png"
import clearImg from "../../assets/clear.png"
import snowImg from "../../assets/snow.png"
import rainImg from "../../assets/rain.png"
import thunderImg from "../../assets/thunder.png"


const weatherList = {
 0:{ img: clearImg, label: "Clear" },
 1:{ img: clearImg, label: "Clear" },
 2:{ img: cloudyImg, label: "Clouds" },
 3:{ img: cloudyImg, label: "Clouds" },
 45:{ img: cloudyImg, label: "Fog" },
 48:{ img: cloudyImg, label: "Fog" },
 51:{ img: rainImg, label: "Drizzle" },
 53:{ img: rainImg, label: "Drizzle" },
 55:{ img: rainImg, label: "Drizzle" },
 56:{ img: rainImg, label: "Drizzle" },
 57:{ img: rainImg, label: "Drizzle" },
 61:{ img: rainImg, label: "Rain" },
 63:{ img: rainImg, label: "Rain" },
 65:{ img: rainImg, label: "Rain" },
 66:{ img: rainImg, label: "Rain" },
 67:{ img: rainImg, label: "Rain" },
 71:{ img: snowImg, label: "Snow" },
 73:{ img: snowImg, label: "Snow" },
 75:{ img: snowImg, label: "Snow" },
 77:{ img: snowImg, label: "Snow" },
 80:{ img: thunderImg, label: "Thunder" },
 95:{ img: thunderImg, label: "Thunder" },
 96:{ img: thunderImg, label: "Thunder" },
 99:{ img: thunderImg, label: "Thunder" },
}

export default weatherList