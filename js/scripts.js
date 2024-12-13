
window.addEventListener('DOMContentLoaded', event => {

    const sidebarWrapper = document.getElementById('sidebar-wrapper');
    let scrollToTopVisible = false;
    // Closes the sidebar menu
    const menuToggle = document.body.querySelector('.menu-toggle');
    menuToggle.addEventListener('click', event => {
        event.preventDefault();
        sidebarWrapper.classList.toggle('active');
        _toggleMenuIcon();
        menuToggle.classList.toggle('active');
    })

    // Closes responsive menu when a scroll trigger link is clicked
    var scrollTriggerList = [].slice.call(document.querySelectorAll('#sidebar-wrapper .js-scroll-trigger'));
    scrollTriggerList.map(scrollTrigger => {
        scrollTrigger.addEventListener('click', () => {
            sidebarWrapper.classList.remove('active');
            menuToggle.classList.remove('active');
            _toggleMenuIcon();
        })
    });

    function _toggleMenuIcon() {
        const menuToggleBars = document.body.querySelector('.menu-toggle > .fa-bars');
        const menuToggleTimes = document.body.querySelector('.menu-toggle > .fa-xmark');
        if (menuToggleBars) {
            menuToggleBars.classList.remove('fa-bars');
            menuToggleBars.classList.add('fa-xmark');
        }
        if (menuToggleTimes) {
            menuToggleTimes.classList.remove('fa-xmark');
            menuToggleTimes.classList.add('fa-bars');
        }
    }

    // Scroll to top button appear
    document.addEventListener('scroll', () => {
        const scrollToTop = document.body.querySelector('.scroll-to-top');
        if (document.documentElement.scrollTop > 100) {
            if (!scrollToTopVisible) {
                fadeIn(scrollToTop);
                scrollToTopVisible = true;
            }
        } else {
            if (scrollToTopVisible) {
                fadeOut(scrollToTop);
                scrollToTopVisible = false;
            }
        }
    })
})
function fadeOut(el) {
    el.style.opacity = 1;
    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};
// BREAK
function fadeIn(el, display) {
    el.style.opacity = 0;
    el.style.display = display || "block";
    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
};
// List of 64 teams
const teams = [
    "Washington", "Washington State", "Oregon", "Oregon State", "Stanford", "Cal", "UCLA", "USC",
    "Boise State", "Arizona", "Arizona State", "BYU", "Utah", "Colorado", "Kansas", "Kansas State",
    "Oklahoma", "Oklahoma State", "Texas", "Baylor", "TCU", "LSU", "Texas Tech", "Texas A&M",
    "Nebraska", "Minnesota", "Wisconsin", "Iowa", "Iowa State", "Missouri", "Illinois", "Northwestern",
    "Arkansas", "Ole Miss", "Mississippi State", "Alabama", "Auburn", "Georgia", "Georgia Tech", "Tennessee",
    "Miami", "UCF", "Florida", "Florida State", "North Carolina", "NC State", "Clemson", "South Carolina",
    "Michigan", "Michigan State", "Notre Dame", "Purdue", "Indiana", "Louisville", "Kentucky", "Ohio State",
    "Syracuse", "Rutgers", "Penn State", "Pitt", "West Virginia", "Virginia", "Virginia Tech", "Maryland"
];

// Function to shuffle teams
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Function to generate a random score between 3 and 63
function getRandomScore() {
    return Math.floor(Math.random() * (63 - 3 + 1)) + 3; // Generates a score between 3 and 63
}

// Function to simulate a game (randomly selects a winner)
function playGame(team1, team2) {
    const score1 = getRandomScore();
    const score2 = getRandomScore();

    const winner = score1 > score2 ? team1 : team2;
    return { winner, score1, score2 };  // Return winner and scores
}

// Function to generate playoff rounds and display the bracket
function generatePlayoffBracket() {
    let currentRound = shuffle(teams).slice(0, 16); // Select 16 teams and shuffle
    const bracketDiv = document.getElementById("bracket");
    bracketDiv.innerHTML = ""; // Clear previous results
    let roundNumber = 1;

    while (currentRound.length > 1) {
        const roundDiv = document.createElement("div");
        roundDiv.classList.add("round");
        roundDiv.innerHTML = `<h2>Round ${roundNumber}</h2>`;

        const nextRound = [];
        for (let i = 0; i < currentRound.length; i += 2) {
            const team1 = currentRound[i];
            const team2 = currentRound[i + 1];
            const { winner, score1, score2 } = playGame(team1, team2);  // Get winner and scores

            const matchupDiv = document.createElement("div");
            matchupDiv.classList.add("matchup");
            matchupDiv.innerHTML = `
                <strong>${team1}</strong> (${score1}) vs <strong>${team2}</strong> (${score2})<br>
                Winner: <strong>${winner}</strong>`;
            roundDiv.appendChild(matchupDiv);

            nextRound.push(winner);
        }

        bracketDiv.appendChild(roundDiv);
        currentRound = nextRound;
        roundNumber++;
    }

    // Display the champion
    const championDiv = document.createElement("div");
    championDiv.classList.add("round");
    championDiv.innerHTML = `<h2>Champion</h2><p><strong>${currentRound[0]}</strong></p>`;
    bracketDiv.appendChild(championDiv);
}

// Attach event listener to the button
document.getElementById("generateBracketButton").addEventListener("click", generatePlayoffBracket);


