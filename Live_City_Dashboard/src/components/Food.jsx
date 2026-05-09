import { useEffect, useState } from "react";
import logo from "../photos/Mycity.png";
import {set_day_weather} from "./Home"

const Food = ({ setPage, city, weather }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  let bgrnd;

  useEffect(() => {
    fetchFood();
  }, []);

  const fetchFood = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=12.9716&longitude=77.5946&limit=30&currency=USD&distance=2&open_now=false&lunit=km&lang=en_US",
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": "01d5c31566mshcbe0ec4a25cfa81p1671e4jsnce345d0edb5e",
            "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
          },
        }
      );

      const result = await response.json();
      console.log(result);

      let filteredData = result.data.filter(function (item) {
        return (
          item.name &&
          item.photo &&
          item.photo.images &&
          item.photo.images.medium &&
          item.photo.images.medium.url
        );
      });

      setRestaurants(filteredData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getRecommendation = () => {
    if (!weather) return "";

    let temp = 0;

    if (weather && weather.main) {
      temp = weather.main.temp;
    }

    if (temp > 30) {
      return "🥤 Hot weather! Try cold drinks or ice cream";
    } else if (temp < 15) {
      return "🍲 Cold weather! Enjoy hot meals";
    } else {
      return "Cozy weather calls for warm cafes !";
    }
  };
 


let day_type = set_day_weather(10)
if (day_type == "sun") {

  bgrnd= (<section className="food_hero_sun">
        <div className="food_hero_content_sun">
          <h1>Food & Dining</h1>
          <p>Cozy weather calls for cool cafes !!</p>
          <h3>{getRecommendation()}</h3>
        </div>
      </section>)

} else if (day_type == "hot") {
  bgrnd= (<section className="food_hero_hot">
        <div className="food_hero_content_hot">
          <h1>Food & Dining</h1>
          <p>Hot weather! Try cold drinks or ice cream</p>
          <h3>{getRecommendation()}</h3>
        </div>
      </section>)

} else {

  bgrnd= (<section className="food_hero_cold">
        <div className="food_hero_content_cold">
          <h1>Food & Dining</h1>
          <p>Cold weather! Enjoy hot meals...</p>
          <h3>{getRecommendation()}</h3>
        </div>
      </section>)
}


console.log(day_type)




useEffect(() => {
  if (loading) return;   
  if (day_type !== "sun") return; 

  const rainContainer = document.getElementById("rain-layer");
  if (!rainContainer) return;

  rainContainer.innerHTML = "";

  for (let i = 0; i < 200; i++) {
    const drop = document.createElement("div");
    drop.classList.add("drop");

    drop.style.left = Math.random() * 100 + "vw";
    drop.style.animationDuration = (0.8 + Math.random()) + "s";
    drop.style.animationDelay = Math.random() + "s";
    drop.style.height = 10 + Math.random() * 20 + "px";
    drop.style.opacity = Math.random();

    rainContainer.appendChild(drop);
  }

  return () => {
    rainContainer.innerHTML = "";
  };

}, [loading, day_type]);


useEffect(() => {
  if (loading) return;   
  if (day_type !== "cold") return; 

  const snowContainer = document.getElementById("snow_layer");
  if (!snowContainer) return;

  snowContainer.innerHTML = "";

  for (let i = 0; i < 120; i++) {
    const snow = document.createElement("div");
    snow.classList.add("snow");

    const size = 4 + Math.random() * 8
    snow.style.left = Math.random() * 100 + "vw";
    snow.style.width = size + "px";
    snow.style.height = size + "px";

    snow.style.animationDuration = 5 + Math.random() * 8 + "s";
    snow.style.animationDelay = Math.random() * 5 + "s";
    snow.style.opacity = 0.3 + Math.random();

    snowContainer.appendChild(snow);
  }

  return () => {
    snowContainer.innerHTML = "";
  };

}, [loading, day_type]);


  const show_food_card = (item, index) => {
    return (
      <div key={index} className="food_card">
        <img
          src={item.photo.images.medium.url}
          alt={item.name}
          className="food_card_img"
        />

        <div className="food_card_body">
          <h3>{item.name}</h3>

          <p className="food_location">
            {item.location_string ? item.location_string : city}
          </p>

          <p className="food_rating">
            ⭐ {item.rating ? item.rating : "N/A"}
          </p>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      // <h2 className="food_loading">
      //   Loading restaurants...
      // </h2>

      
      // taken online =>
        <div className="Loader_parent">
      <div className="loader">
        <div className="text"><span>Loading</span></div>
        <div className="text"><span>Loading</span></div>
        <div className="text"><span>Loading</span></div>
        <div className="text"><span>Loading</span></div>
        <div className="text"><span>Loading</span></div>
        <div className="text"><span>Loading</span></div>
        <div className="text"><span>Loading</span></div>
        <div className="text"><span>Loading</span></div>
        <div className="text"><span>Loading</span></div>
        <div className="line"></div>
      </div>
      </div>

    );
  }

  return (
    
    <div>
      {!loading && day_type=="sun" && <div id="rain-layer"></div>}
      {!loading && day_type=="cold" && <div id="snow_layer"></div>}
      <nav className="home_navbar">
        <div className="nav_brand">
          <img src={logo} className="imgg" />
          <h2>MyCity</h2>
        </div>

        <div className="nav_links">
          <button className="nav_icon" onClick={() => setPage("home")}>
            <i className="fa-solid fa-house"></i>
          </button>

          <button className="nav_icon" onClick={() => setPage("weather")}>
            <i className="fa-solid fa-cloud"></i>
          </button>

          <button className="nav_icon" onClick={() => setPage("traffic")}>
            <i className="fa-solid fa-car"></i>
          </button>

          <button className="nav_icon" onClick={() => setPage("food")}>
            <i className="fa-solid fa-utensils"></i>
          </button>

          <button className="nav_icon" onClick={() => setPage("alerts")}>
            <i className="fa-solid fa-bell"></i>
          </button>
        </div>
      </nav>

      {/* <section className="food_hero">
        <div className="food_hero_content">
          <h1>Food & Dining</h1>
          <p>Explore the best restaurants of your city.....</p>
          <h3>{getRecommendation()}</h3>
        </div>
      </section> */}
      {bgrnd}

      <section className="food_section">
        <h2>Today's most picked...</h2>

        <div className="food_grid">
          {restaurants.slice(0, 5).map((item, index) => (
            show_food_card(item, index)
          ))}
        </div>
      </section>

      <section className="food_section">
        <h2>Explore nearby</h2>

        <div className="food_grid">
          {restaurants.slice(5, 10).map((item, index) => (
            show_food_card(item, index)
          ))}
        </div>
      </section>

      <section className="food_section">
        <h2>All restaurants</h2>

        <div className="food_grid">
          {restaurants.map((item, index) => (
            show_food_card(item, index)
          ))}
        </div>
      </section>
    </div>
  );
};

export default Food;
