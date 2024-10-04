fetch("../json/food.json")
  .then((response) => response.json())
  .then((data) => {
    let categories = Object.keys(data);
    const myCate = document.getElementById("categories-container");
    for (let i = 0; i < categories.length; i++) {
      const cateLi = document.createElement("li");
      cateLi.innerHTML = `<li
                        class="catemenu" style="padding: 8px 16px">
                        <span class = "namecate"
                        style="cursor:pointer;font-family: 'Roboto','Helvetica','Arial',sans-serif;font-weight: 400;line-height: 1.5;letter-spacing: 0.00938em;font-size: 14px;">${categories[i]}(${data[categories[i]].length})</span>
                    </li>`;
      myCate.appendChild(cateLi);
      var searchcate = `
      <div class="fs-16 text-bold catename" style="padding: 16px 16px 0px">
        <div class="category${i} cate-name">${categories[i]}(${data[categories[i]].length})</div>
        <div class="row food-item" id="searchcate${i}"></div>
    </div>`;
      $("#food-container").append(
        searchcate
      );
      let dish = data[categories[i]];
      const container = document.getElementById(`searchcate${i}`);
      for (let a = 0; a < dish.length; a++) {
        let imgSpan;
        if (dish[a].img != "blank") {
          imgSpan = `
                                <img
                                                    id="foodImg"
                                                    src="https://fnb.dktcdn.net/media/100/051/700/products/img-5279.jpeg"
                                                    alt="https://fnb.dktcdn.net/media/100/051/700/products/img-5279.jpeg"
                                                    style="object-fit: contain; border-radius: 4px; width: 80px; display: block; height: 80px;">`;
        } else {
          imgSpan = `
                                <div id="foodImg" style="color: rgb(255, 255, 255); margin: auto; font-size: 36px;">GỎ</div>`;
        }
        let col = 6;
        if (dish.length == 1) {
          col = 12;
        } else if (dish.length == 2) {
          col = 6;
        }
        const foodDiv = document.createElement("div");
        foodDiv.className = `col-md-6 col-xl-${col}`;
        foodDiv.id = `search`;
        foodDiv.style.borderBottom = "1px solid rgb(232, 234, 235)";
        foodDiv.innerHTML = `
                <div class="fl_line pd-16">
                    <div class="foodid${dish[a].id}" style="visibility: hidden;">${dish[a].id}</div>
                    <div style="position: relative; height: 100%;">
                        <button class="MuiButtonBase-root MuiButton-root MuiButton-text b-items__item__img" tabindex="0" type="button" style="background-color: rgb(177, 175, 175); height: 80px; width: 80px; min-width: 80px; box-shadow: rgba(168, 168, 168, 0.25) 0px 2px 4px; border-radius: 4px; display: flex; justify-items: center; justify-content: center; margin: auto;">
                            <span class="MuiButton-label">
                                ${imgSpan}
                            </span>
                            <span class="MuiTouchRipple-root"></span>
                        </button>
                        <div id="ordered${dish[a].id}" style="position: absolute; right: -5px; bottom: -5px;display:none">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="8" fill="white"></circle>
                                <path d="M12 2C6.48672 2 2 6.48672 2 12C2 17.5133 6.48672 22 12 22C17.5133 22 22 17.5133 22 12C22 6.48672 17.5133 2 12 2ZM17.0688 9.88125L11.6523 15.2977C11.4898 15.4602 11.2758 15.5414 11.0633 15.5414C10.85 15.5414 10.6367 15.4602 10.4742 15.2977L7.76562 12.5891C7.44063 12.2641 7.44063 11.7367 7.76562 11.4102C8.09063 11.0836 8.61797 11.0852 8.94453 11.4102L11.0633 13.5289L15.8906 8.70156C16.2156 8.37656 16.743 8.37656 17.0695 8.70156C17.3961 9.02656 17.3938 9.55469 17.0688 9.88125Z" fill="#0FD186"></path>
                            </svg>
                        </div>
                    </div>
                    <div class="fl_g1" style="margin-left: 16px; word-break: break-word;">
                        <div>
                            <div class="fs-16 text-bold text-breakword foodname">
                                <span id="foodName${dish[a].id}">${dish[a].name}</span>
                            </div>
                            <div class="fs-16 mr-b-4 fl_line">
                                <div class="fl_g1 m-auto" id="foodPrice${dish[a].id}">${dish[a].price}</div>
                            </div>
                            <div class="fs-16 mr-b-4 fl_line">
                                <div class="fl_line">
                                    <div class="fl_line" id="minusGroup${dish[a].id}"  style="display:none;">
                                        <button class="btnMinus" id="foodid${dish[a].id}" style="background-color: white;border-style: none;>
                                            <span class="style_icon_button_label__2x70B">
                                                <svg class="icon_28" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14 0C6.272 0 0 6.272 0 14C0 21.728 6.272 28 14 28C21.728 28 28 21.728 28 14C28 6.272 21.728 0 14 0ZM2.8 14C2.8 20.174 7.826 25.2 14 25.2C20.174 25.2 25.2 20.174 25.2 14C25.2 7.826 20.174 2.8 14 2.8C7.826 2.8 2.8 7.826 2.8 14ZM7 12.6V15.4H21V12.6H7Z" fill="#0088FF"></path>  
                                                    </svg>
                                                </span>
                                    </button>
                                                             <span class="itemCount${dish[a].id}" style="margin: 3px 5px;"></span></div></div>
                                    <div id="addContainer">
                                        <button class="btnAdd" id="foodid${dish[a].id}"style="background-color: white;border-style: none;">
                                        <span>
                                            <svg class="icon_28" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z" fill="#0088FF"></path>
                                                <path d="M13.8889 10.5548H10.5556V13.8881H9.44445V10.5548H6.11111V9.44368H9.44445V6.11035H10.5556V9.44368H13.8889V10.5548Z" fill="#F3F4F5"></path>
                                            </svg>
                                        </span>
                                        <span class="style_touch_ripple_root__1cNes"></span>
                                    </div>
                                </div>
                            </div>
                            <div style="color: rgba(33, 43, 53, 0.8); word-break: break-word;"></div>
                        </div>
                    </div>
                </div>
            `;
        $(container).append(foodDiv);
      }
    }
  })
  .catch((error) => console.error("Error fetching JSON:", error));
