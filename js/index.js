function petsCategory() {
    spin();
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
      .then(res => res.json())
      .then(data => {
        displayCategories(data.categories);
      })
      .catch(err => {
        console.error(err);
      });
  }
  
  function spin() {
    const spinner = document.getElementById('spinner');
    document.getElementById('Main').classList.add('hidden');
    spinner.style.display = 'block';
    document.getElementById('sec').classList.add('h-[200px]');
  
    setTimeout(function () {
      spinner.style.display = 'none';
      document.getElementById('Main').classList.remove('hidden');
      document.getElementById('sec').classList.remove('h-[200px]');
    }, 2000);
  }
  
  function openModalWithCountdown(duration = 3, button) {
    const countdownElement = document.getElementById('countdown');
    let countdownValue = duration;
  
    document.getElementById('countdownModal').showModal();
    button.setAttribute('disabled', true);
  
    countdownElement.textContent = countdownValue;
  
    const intervalId = setInterval(() => {
      countdownValue -= 1;
      countdownElement.textContent = countdownValue;
  
      if (countdownValue <= 0) {
        closeModal();
        clearInterval(intervalId);
        button.removeAttribute('disabled');  // Re-enable button after countdown
      }
    }, 1000);
  }
  
  function closeModal() {
    document.getElementById('countdownModal').close();
  }
  
  function displayCategories(pets) {
    const s3 = document.getElementById('s-3');
    s3.innerHTML = '';
    pets.forEach(pet => {
      s3.innerHTML += `
        <div>
          <button ondblclick="spin()" onclick="btnpet('${pet.category}')" class="btn px-10 rounded-lg border">
            ${pet.category}s <img class="h-10" src=${pet.category_icon} alt="">
          </button>
        </div>
      `;
    });
  }
  
  function btnpet(petname) {
    spin();
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${petname}`)
      .then(res => res.json())
      .then(data => sortbtn(data.data))
      .catch(err => console.error(err));
  }
  
  function sortbtn(pets) {
    pets.sort((a, b) => b.price - a.price);
    displayAllPets(pets);
  }
  
  function allPetsCategory() {
    spin();
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
      .then(res => res.json())
      .then(data => {
        displayAllPets(data.pets);
      })
      .catch(err => {
        console.error(err);
      });
  }
  
  function displayAllPets(pets) {
    const d1 = document.getElementById('d-1');
    d1.innerHTML = ""; // clear previous content
    
    if (pets.length == 0) {
      document.getElementById('d-1').classList.remove('grid');
      d1.innerHTML = `
        <div class="flex justify-center mt-10 mb-5"> 
          <img src="./images/error.webp" alt="">
        </div>
        <p class="text-center mb-5">No information Available</p>
        <p class="text-center">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
      `;
      return;
    } else {
      document.getElementById('d-1').classList.add('grid');
    }
  
    pets.forEach((pet) => {
      d1.innerHTML += `
        <div class="px-5 py-5 bg-base-100 shadow-xl">
          <figure>
            <img src=${pet.image} alt="${pet.pet_name}" class="rounded-xl" />
          </figure>
          <div class="mt-5 space-y-3">
            <p class="text-xl font-bold">${pet.pet_name}</p>
            <p><i class="fa-solid fa-bread-slice"></i> Breed: ${(pet.breed) ? pet.breed : 'Not Available'}</p>
            <p><i class="fa-solid fa-cake-candles"></i> Birth: ${(pet.date_of_birth) ? pet.date_of_birth : 'Not Available'}</p>
            <p><i class="fa-solid fa-mercury"></i> Gender: ${(pet.gender) ? pet.gender : 'Not Available'}</p>
            <p><i class="fa-solid fa-dollar-sign"></i> Price: ${(pet.price) ? pet.price : 'Not Available'}$</p>
            <div class="divider"></div>
            <div class="flex justify-between">
              <button onclick="displayLike('${pet.image}')" class="btn">
                <i class="fa-regular fa-thumbs-up"></i>
              </button>
              <button onclick='openModalWithCountdown(3,this)' class="btn text-[#0E7A81] font-semibold">Adopt</button>
              <button onclick="Details('${pet.image}', '${pet.pet_name}', '${pet.breed}', '${pet.gender}', '${pet.vaccinated_status}', '${pet.date_of_birth}', '${pet.price}', '${pet.pet_details.replace(/'/g, "\\'")}')" class="btn text-[#0E7A81] font-semibold">Details</button>
            </div>
          </div>
        </div>
      `;
    });
  }
  
  
  
  function displayLike(petImage) {
    const d2 = document.getElementById('d-2');
    d2.innerHTML += `
      <div class="p-3 border"><img class="h-full rounded-lg w-full object-cover" src=${petImage} alt="Liked Pet Image"></div>
    `;
  }
  
  function Details(image, pet_name, breed, gender, vaccinated_status, date_of_birth, price, pet_details) {
    const box = document.getElementById('box');
    box.innerHTML = `
      <img class="w-full" src="${image}" alt="${pet_name}">
      <p class="mt-5 text-2xl font-bold mb-4">${pet_name}</p>
      <div class="flex gap-9 mb-5">
        <div>
          <p><i class="fa-solid fa-bread-slice"></i> Breed: ${(breed) ? breed : 'Not Available'}</p>
          <p><i class="fa-solid fa-mercury"></i> Gender: ${(gender) ? gender : 'Not Available'}</p>
          <p><i class="fa-solid fa-shield-virus"></i> Vaccinated Status: ${(vaccinated_status) ? vaccinated_status : 'Not Available'}</p>
        </div>
        <div>
          <p><i class="fa-solid fa-cake-candles"></i> Birth: ${(date_of_birth) ? date_of_birth : 'Not Available'}</p>
          <p><i class="fa-solid fa-dollar-sign"></i> Price: ${(price) ? price : 'Not Available'}$</p>
        </div>
      </div>
      <div class="divider mb-5"></div>
      <p class="mb-5 font-bold">Detailed Information</p>
      <p>${pet_details}</p>
      <div class="modal-action">
        <form method="dialog" class="w-full">
          <div> 
            <button class="btn w-full text-[#0E7A81] bg-[#0E7A811A]">Cancel</button>
          </div>
        </form>
      </div>
    `;
  
    document.getElementById('mymodal').showModal();
  }
  
  
  
  document.getElementById('sort').addEventListener('click', () => {
    spin();
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
      .then(res => res.json())
      .then(data => sortbtn(data.pets))
      .catch(err => console.error(err));
  });
  
  // Initialize categories and pets
  petsCategory();
  allPetsCategory();
  