const slidePage = document.querySelector(".slide-page");
const nextBtnFirst = document.querySelector(".firstNext");
const prevBtnSec = document.querySelector(".prev-1");
const nextBtnSec = document.querySelector(".next-1");
const prevBtnThird = document.querySelector(".prev-2");
const nextBtnThird = document.querySelector(".next-2");
const prevBtnFourth = document.querySelector(".prev-3");
const nextBtnFourth = document.querySelector(".next-3");
const submitBtn = document.querySelector(".submit");
const progressText = document.querySelectorAll(".step p");
const progressCheck = document.querySelectorAll(".step .check");
const bullet = document.querySelectorAll(".step .bullet");
const privacyPolicyCheckbox = document.getElementById("privacy-policy-checkbox");
let current = 1;
const serverBaseUrl = "http://100.25.135.63:3100";


var userId = 0;

const formData = {
	totalPrice: 0,
	// 1st page types 
	daysTreatment: '',
	surgicalInterventions: '',
	typeOfInjury: '',
	// 2nd page select price
	psychologicalSequelae: '',
	aestheticSequels: '',
	permanentWorkIncapacity: '',
	// 3rd info
	name: '',
	email: '',
	phone: 0,
};

const validateEmail = (email) => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
};
const validatePhone = (phone) => {

	if (!phone || !phone.length) { return false; }

	if (phone.length < 10) { return false; }
	return true;
};
const setTotalPrice = () => {
	$('#totalUsers').html(`€ ${formData.totalPrice}`);
};

// 1st page nect button
nextBtnFirst.addEventListener("click", function (event) {
	event.preventDefault();

	formData.daysTreatment = $('#daysTreatment').find(":selected").val();
	formData.surgicalInterventions = $('#surgicalInterventions').find(":selected").val();
	formData.typeOfInjury = $('#typeOfInjury').find(":selected").val();

	slidePage.style.marginLeft = "-25%";
	bullet[current - 1].classList.add("active");
	progressCheck[current - 1].classList.add("active");
	progressText[current - 1].classList.add("active");
	current += 1;
});

// select prices next button
nextBtnSec.addEventListener("click", function (event) {
	event.preventDefault();
	const p1 = Number($('#price1').find(":selected").val());
	const p2 = Number($('#price2').find(":selected").val());
	const p3 = Number($('#price3').find(":selected").val());

	formData.psychologicalSequelae = $('#price1').find(":selected").data('val');
	formData.aestheticSequels = $('#price2').find(":selected").data('val');
	formData.permanentWorkIncapacity = $('#price3').find(":selected").data('val');

	formData.totalPrice = p1 + p2 + p3;

	slidePage.style.marginLeft = "-50%";
	bullet[current - 1].classList.add("active");
	progressCheck[current - 1].classList.add("active");
	progressText[current - 1].classList.add("active");
	current += 1;
});

// info next button
nextBtnThird.addEventListener("click", async function (event) {
	event.preventDefault();

	if (!privacyPolicyCheckbox.checked) {
		alert("Please accept Terms of Privacy");
		return;
	}


	const email = $("#email").val().trim();
	const phone = $("#phone").val().trim();
	const name = $("#name").val().trim();

	if (!validateEmail(email)) {
		return alert("Please enter a valid email address");
	}
	formData.email = email;
	if (!validatePhone(phone)) {
		return alert("Please enter a valid phone number (starting with \'+\')");
	}
	formData.phone = phone;
	if (!name || !name.length) {
		return alert('Please enter a valid name');
	}
	formData.name = name;


	//	const response = await axios.post(`${serverBaseUrl}/api/signup`, { ...formData });

	// good to go...
	try {
		const response = await axios.post(`${serverBaseUrl}/api/signup`, { ...formData });
		userId = response.data.user.id;
		alert(response.data.message);
		slidePage.style.marginLeft = "-75%";
		bullet[current - 1].classList.add("active");
		progressCheck[current - 1].classList.add("active");
		progressText[current - 1].classList.add("active");
		current += 1;
		return;

	} catch (error) {
		alert(error.response.data.message);
		return;
	}

});

// OTP page
nextBtnFourth.addEventListener("click", async function () {

	const otp = $("#txtOtp").val();
	if (!otp) {
		alert("Enter OTP");
		return;
	}

	try {
		const response = await axios.post(`${serverBaseUrl}/api/verify-otp`, { id: userId, otp });

		alert(response.data.message);
		slidePage.style.marginLeft = "-100%";
		bullet[current - 1].classList.add("active");
		progressCheck[current - 1].classList.add("active");
		progressText[current - 1].classList.add("active");
		current += 1;

		setTotalPrice();
		return;

	} catch (error) {
		alert(error.response.data.message);
		return;
	}

});




prevBtnSec.addEventListener("click", function (event) {
	event.preventDefault();
	slidePage.style.marginLeft = "0%";
	bullet[current - 2].classList.remove("active");
	progressCheck[current - 2].classList.remove("active");
	progressText[current - 2].classList.remove("active");
	current -= 1;
});
prevBtnThird.addEventListener("click", function (event) {
	event.preventDefault();
	slidePage.style.marginLeft = "-25%";
	bullet[current - 2].classList.remove("active");
	progressCheck[current - 2].classList.remove("active");
	progressText[current - 2].classList.remove("active");
	current -= 1;
});
prevBtnFourth.addEventListener("click", function (event) {
	event.preventDefault();
	slidePage.style.marginLeft = "-50%";
	bullet[current - 2].classList.remove("active");
	progressCheck[current - 2].classList.remove("active");
	progressText[current - 2].classList.remove("active");
	current -= 1;
});



submitBtn.addEventListener("click", function (event) {
	event.preventDefault();
	location.reload();
});


const checkServerConnection = async () => {
	try {
		return await axios.get(`${serverBaseUrl}/api/hello`);
	} catch (error) {
		return alert(`Error getting server connection`);
	}
};



