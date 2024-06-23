let completions;

//let filterRated = false;

function renderList(items) {
    const list = document.getElementById("completionList");
    list.innerHTML = '';
	items.forEach((item) => { 
		const difficulty = item[currentDifficulty];
		if (document.getElementById('sortCriteria').value=='hard') {
			if (item.video !== "NA") {
			// Extract video ID from embed link
			const videoId = extractVideoId(item.video);
			// Construct thumbnail URL
			const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
			const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
			const listItem = document.createElement("li");
			listItem.innerHTML = `
				<div>
					<img src="${thumbnailUrl}" alt="Thumbnail" class="video-thumbnail" data-video="${watchUrl}" style="width: 300px; height: 169px; cursor: pointer;">
				</div>
				<div class="info">
					<h3 class="linkName"><a href="${watchUrl}" style="text-decoration:none; color:inherit">${item.name}</a></h3>
					<p>Placement: ${difficulty} - Date: ${item.convdate}</p>
					<p>${item.description}</p>
				</div>
			`;
			list.appendChild(listItem);
		} else {
			const listItem = document.createElement("li");
			listItem.innerHTML = `
				<div class="noBg">
					<h3>${item.name}</h3>
					<p>Difficulty: ${difficulty} - Date: ${item.convdate}</p>
					<p>${item.description}</p>
				</div>
			`;
			list.appendChild(listItem);
			}
        } else {
          if (item.video !== "NA") {
            // Extract video ID from embed link
            const videoId = extractVideoId(item.video);
            // Construct thumbnail URL
            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
            const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <div>
                    <img src="${thumbnailUrl}" alt="Thumbnail" class="video-thumbnail" data-video="${watchUrl}" style="width: 300px; height: 169px;">
                </div>
                <div class="info">
                    <h3 class="linkName"><a href="${watchUrl}" style="text-decoration:none; color: inherit">${item.name}</a></h3>
                    <p>Date: ${item.convdate}</p>
                    <p>${item.description}</p>
                </div>
            `;
            list.appendChild(listItem);
          } else {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <div class="noBg">
                    <h3>${item.name}</h3>
                    <p>Date: ${item.convdate}</p>
                    <p>${item.description}</p>
                </div>
            `;
            list.appendChild(listItem);
        }
        }
    });

    const thumbnails = document.querySelectorAll('.video-thumbnail');
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            const videoUrl = thumbnail.getAttribute('data-video');
            window.open(videoUrl, '_blank');
        });
    });
}

function extractVideoId(embedLink) {
    const regExp = /(?:\/|v=)([a-zA-Z0-9_-]{11})(?:\?|&|$)/;
    const match = embedLink.match(regExp);
    if (match && match[1]) {
        return match[1];
    } else {
        return null;
    }
}



function sortList(criteria) {
    filteredCompletions.sort((a, b) => {
        if (criteria === 'hard') {
            const diffA = a[currentDifficulty];
            const diffB = b[currentDifficulty];
            document.getElementById("difficultyDropdown").disabled = false;
            return diffA - diffB;
        } else if (criteria === 'dateMostRecent') {
            document.getElementById("difficultyDropdown").disabled = true;
            return new Date(b.date) - new Date(a.date);
            
        }
        else if (criteria === 'dateOldest') {
            document.getElementById("difficultyDropdown").disabled = true;
            return new Date(a.date) - new Date(b.date);
        }
    });
    renderList(filteredCompletions);
}

function toggleFilter() {
    //filterRated = !filterRated;
    if (document.getElementById('filterRated').checked) {
        filteredCompletions = completions.filter(item => item.type === 'TRUE');
    } else {
        filteredCompletions = completions;
    }
    renderList(filteredCompletions);
    //document.getElementById('sortCriteria').getElementsByTagName('option')[0].selected = true;
    //document.getElementById('difficultyDropdown').getElementsByTagName('option')[0].selected = true;
}

function changeDifficulty() {
    const difficultyDropdown = document.getElementById("difficultyDropdown");
    currentDifficulty = difficultyDropdown.value;
    renderList(filteredCompletions);
    document.getElementById('sortCriteria').getElementsByTagName('option')[0].selected = true;
    sortList('hard');
}


fetch('https://wiglett.ca/hardest/completions.json')
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		completions = data;
        do_everything_else();
	})
    // WHO NEEDS ERROR HANDLING AM I RIGHT!!!!!!                                                                                                            :3
	//.catch((error) => {
	//	console.log('An error occurred:', error);
	//});

let filteredCompletions;
let currentDifficulty;

function do_everything_else() {
    currentDifficulty = 'imo';
    filteredCompletions = completions;
    renderList(filteredCompletions);

    var coll = document.getElementsByClassName("collapsible");

    for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var container = this.nextElementSibling;
        if (container.style.maxHeight){
            container.style.maxHeight = null;
        } else {
            container.style.maxHeight = container.scrollHeight + "px";
        }
    });
    }
    
}
