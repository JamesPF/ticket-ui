var ageId;
var startDate = moment().format('YYYY-MM-DD');
var datesArray = [];
var newDay;

$('input[name="start-date"]').val(startDate);

// Creates an array of startDate plus five dates after it and renders list items
function setDateOptions () {
  $('#date-options').html('');
  datesArray.length = 0;
  datesArray.push(startDate);
  newDay = startDate;

  for (var i = 0; i < 5; i++) {
    newDay = moment(newDay).add(1, 'day').format('YYYY-MM-DD');
    datesArray.push(newDay);
  }
  // Creates a new li item for each date in the datesArray
  datesArray.forEach(function (date) {
    var dayName = moment(date).format('ddd,');
    var monDate = moment(date).format('MMM DD');
    $('#date-options').append('<li class="ticket-date col-sm-2" data-date="' + date + '"><h3>'+
    dayName + '<br/>' + monDate +
    '</h3><div class="ticket-day-price"><p class="text-center">Starting at</p><p class="text-center ticket-price">$000.00</p></div></li>');

    if (date === startDate) {
      $('.ticket-day-price').addClass('highlighted');
    }
  });
}

// Highlight selected date and unhighlight the rest
// Updates 'Start Date' in step 4
$(document).on('click', '.ticket-day-price', function () {
  $('.ticket-day-price').removeClass('highlighted');
  $(this).addClass('highlighted');
  var date = $(this).parent().attr('data-date');
  $('#display-start-date').html(moment(date).format('MM/D/YYYY'));
});

// Renders 'Enter Your Details' section with age field if 'New Ticket' selected
$('#new-ticket').on('click', function () {
  ageId = '<label for="age" class="control-label">Age</label>' +
  '<input name="age" class="form-control" type="number"/>';
  $('#age-id').html(ageId);
  $('#enter-details').show();
});

// Renders 'Enter Your Details' section with card ID field if 'Reload' selected
$('#reload-ticket').on('click', function () {
  ageId = '<label for="id" class="control-label">Card ID #</label>' +
  '<input name="id" class="form-control" type="text" placeholder="K58XXXXX-XXX-XXX"/>';
  $('#age-id').html(ageId);
  $('#enter-details').show();
});

// Either shows 'Choose a Day', 'Your Ticket Info', or nothing new depending on user input
$('#search-days').on('click', function () {
  var days = parseInt($('input[name="number-of-days"]').val());
  startDate = $('input[name="start-date"]').val();
  setDateOptions();
  $('#display-start-date').html(moment(startDate).format('MM/D/YYYY'));

  if (days < 1) {
    $('#choose-day').hide();
    $('#ticket-info').hide();
    $('#checkout').hide();
    return;
  } else if (days === 1) {
    $('#choose-day').show();
    $('#ticket-info').show();
  } else {
    $('#choose-day').hide();
    $('#ticket-info').show();
  }
});

// Shows 'Need More Tickets?' when 'Add to Cart' is clicked
$('#add-to-cart').on('click', function () {
  $('#checkout').show();
});

// Hides all fields but first one when 'Add Another Ticket' is clicked
$('#add-another').on('click', function () {
  $('#enter-details').hide();
  $('#choose-day').hide();
  $('#ticket-info').hide();
  $('#checkout').hide();
});
