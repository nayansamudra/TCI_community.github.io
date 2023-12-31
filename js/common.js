/*----------------------------
    dark-light-theme 
----------------------------*/

$(document).on('click', '#mode_nav', function () {
    mode = $('#mode_text').text()
    mode_mobile = $('#mode_text_mobile').text()
    if (mode == 'dark_mode' && mode_mobile == 'dark_mode') {
        localStorage.setItem('theme', 'light')
        $('#mode_text').text('light_mode')
        $('#mode_text_mobile').text('light_mode')
        $('body').attr('class', 'theme-color-default light')
    } else if (mode == 'light_mode' && mode_mobile == 'light_mode') {
        localStorage.setItem('theme', 'dark')
        $('#mode_text').text('dark_mode')
        $('#mode_text_mobile').text('dark_mode')
        $('body').attr('class', 'theme-color-default dark')
    }
})

$(document).on('click', '#mode_nav_mobile', function () {
    mode = $('#mode_text').text()
    mode_mobile = $('#mode_text_mobile').text()
    if (mode == 'dark_mode' && mode_mobile == 'dark_mode') {
        localStorage.setItem('theme', 'light')
        $('#mode_text').text('light_mode')
        $('#mode_text_mobile').text('light_mode')
        $('body').attr('class', 'theme-color-default light')
    } else if (mode == 'light_mode' && mode_mobile == 'light_mode') {
        localStorage.setItem('theme', 'dark')
        $('#mode_text').text('dark_mode')
        $('#mode_text_mobile').text('dark_mode')
        $('body').attr('class', 'theme-color-default dark')
    }
})

/*----------------------------
    Form Validation 
----------------------------*/

// Image Validation
$(document).on("change", "input[type='file']", function () {
    try {
        if (this.files[0].size > 2000000) {
            toast_function('warning', 'Please upload a file less than 2MB. Thanks!!')
            $(this).val('');
            return;
        }
    }
    catch (e) { console.log("File Removed!"); return }


    var allowed_ext = ['jpg', 'png', 'jpeg']
    var curr_ext = $("#Image_input").val()
    if (!curr_ext) {
        toast_function("warning", "File input is empty.");
        return;
    }
    curr_ext = curr_ext.split('.').pop();
    curr_ext = curr_ext.toLowerCase();
    if (allowed_ext.includes(curr_ext)) {
        console.log("Ext allowed")
    }
    else {
        toast_function("warning", "Only Image (jpg, jpeg, png) allowed!")
        $(this).val('');
    }
});

// Textarea Validation
$(document).on("input", "#feedback_text", function () {
    var currentLength = $(this).val().length;
    var maxLength = 1500;

    if (currentLength > maxLength) {
        $(this).val($(this).val().substring(0, maxLength)); // Truncate the input to the maximum length
        $("#error_message").text("Maximum character limit reached (1500 characters).");
    } else {
        $("#error_message").text(""); // Clear the error message if within the limit
    }
});

// Input[type="text"] validation
const validateName = (inputElement) => {
    var nameInput = inputElement.value;
    var nameRegex = /^[A-Za-z\s]+$/;

    if (!nameRegex.test(nameInput)) {
        toast_function("warning", "Textbox should contain only letters and spaces.");
        inputElement.value = nameInput.replace(/[^A-Za-z\s]+/g, '');
    }
}

// Input[type="number"] validation
const validateNumber = (inputElement) => {
    var numberInput = inputElement.value;
    var numberRegex = /^\d+$/;

    var sanitizedNumber = numberInput.replace(/\D/g, '');

    if (sanitizedNumber.length > 15) {
        sanitizedNumber = sanitizedNumber.slice(0, 15);
    }

    if (!numberRegex.test(sanitizedNumber)) {
        toast_function("warning", "WhatsApp Number should contain only numbers.");
    }

    inputElement.value = sanitizedNumber;
}

/*----------------------------
    Toast Function
----------------------------*/

// Add toast container using jquery
const create_toast = () => {
    var toastContainer = '<div class="toast-container position-fixed top-0 end-0 p-3">' +
        '<div class="toast align-items-center bg-warning text-warning" id="toast-alert" role="alert" aria-live="assertive" aria-atomic="true">' +
        '<div class="toast-header bg-warning text-warning" id="toast-alert-heading">' +
        '<strong class="me-auto" style="font-size: 16px;" id="Header_toast_message"><i class="fa-solid fa-triangle-exclamation"></i>Warning</strong>' +
        '<button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>' +
        '</div>' +
        '<div class="d-flex">' +
        '<div class="toast-body toast-body_1" style="font-weight: 400; font-size: 22px; padding: 0.5rem;">' +
        'Please Enter all fields!' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';

    // Insert the toast container above the footer
    $("footer").before(toastContainer);
}

// comman toast function
const toast_function = (state, message) => {
    if (state == 'success') {
        $('#toast-alert').removeClass().addClass('toast align-items-center bg-success text-success')
        $('#toast-alert-heading').removeClass().addClass('toast-header bg-success text-success')
        $('#Header_toast_message').html('<i class="fa-solid fa-circle-check"></i> Success')
    } else if (state == 'danger') {
        $('#toast-alert').removeClass().addClass('toast align-items-center bg-danger text-danger')
        $('#toast-alert-heading').removeClass().addClass('toast-header bg-danger text-danger')
        $('#Header_toast_message').html('<i class="fa-solid fa-circle-exclamation"></i> Warning')
    } else if (state == 'warning') {
        $('#toast-alert').removeClass().addClass('toast align-items-center bg-warning text-warning')
        $('#toast-alert-heading').removeClass().addClass('toast-header bg-warning text-warning')
        $('#Header_toast_message').html('<i class="fa-solid fa-triangle-exclamation"></i> Warning')
    }

    $('.toast-body_1').text(message)

    toastList.forEach(toast => toast.show());
    setTimeout(() => {
        toastList.forEach(toast => toast.hide());
    }, 300000);
}

/*----------------------------
    When document is ready
----------------------------*/

$(document).ready(function () {

    // ------- For Creating
    create_toast()

    // -------- For Alerts
    const toastElList = document.querySelectorAll('#toast-alert')
    const toastoptions = {
        animation: true,
        delay: 5000 
    };
    toastList = [...toastElList].map(toastEl => new bootstrap.Toast(toastEl, toastoptions))


    // ------- For Theme
    theme = localStorage.getItem('theme')
    if (theme == null) {
        localStorage.setItem('theme', 'dark')
        $('#mode_text').text('dark_mode')
        $('#mode_text_mobile').text('dark_mode')
        $('body').attr('class', 'theme-color-default dark')
    } else if (theme == 'dark') {
        $('#mode_text').text('dark_mode')
        $('#mode_text_mobile').text('dark_mode')
        $('body').attr('class', 'theme-color-default dark')
    } else if (theme == 'light') {
        $('#mode_text').text('light_mode')
        $('#mode_text_mobile').text('light_mode')
        $('body').attr('class', 'theme-color-default light')
    }
})