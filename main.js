
function ShowHide() {
    const menu = document.getElementById("hamMenu");
    if (menu) {
      menu.classList.toggle("show");
    }
    //after clicking one of the 5 options, the menu will disappear
    const options = document.querySelectorAll("#hamMenu a");
    options.forEach(option => {
      option.addEventListener("click", () => {
        menu.classList.remove("show");
      });
    });
    
    
}

const API_KEY = 'AIzaSyArFiKLrSQxuGHBB_HQKvgJwS7-oNGn3UQ';
const CALENDAR_ID = 'ewb.uky@gmail.com';

// Function to fetch events from Google Calendar API olny for the current week, and display it in div id = "thisweekSection"
async function fetchEvents() {
    const now = new Date(); // Get current date and time
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const endOfWeek = new Date(now.setDate(startOfWeek.getDate() + 6));

    // Fetch events from Google Calendar API for the current week
    const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}&timeMin=${startOfWeek.toISOString()}&timeMax=${endOfWeek.toISOString()}`);
    const data = await response.json();

    // Display events in the "thisweekSection" div
    const eventsContainer = document.getElementById('thisweekSection');
    eventsContainer.innerHTML = ''; // Clear previous events

    if (data.items && data.items.length > 0) {
        data.items.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.classList.add('event');

            const title = document.createElement('li');
            title.textContent = event.summary || 'No Title';
            eventElement.appendChild(title);


            const date = document.createElement('p');
            const eventDate = new Date(event.start.dateTime || event.start.date);
            date.textContent = `Date: ${eventDate.toLocaleDateString()} ${eventDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}`;
            eventElement.appendChild(date);

    

            eventsContainer.appendChild(eventElement);
        });
    } else {
        eventsContainer.textContent = 'No events this week!';
    } 
}

// Call the function to  fetch and display events when the page loads
window.onload = fetchEvents;



