// Load and display publications from JSON file
document.addEventListener('DOMContentLoaded', function() {
    fetch('publications.json')
        .then(response => response.json())
        .then(publications => {
            const container = document.getElementById('publications-list');

            publications.forEach(pub => {
                const p = document.createElement('p');

                // Create title (with link if available)
                let titleHTML = '';
                if (pub.link) {
                    titleHTML = `<a href="${pub.link}" target="_blank"><papertitle>${pub.title}</papertitle></a>`;
                } else {
                    titleHTML = `<papertitle>${pub.title}</papertitle>`;
                }

                // Create authors list
                let authorsHTML = pub.authors.map(author => {
                    if (author === pub.highlightAuthor) {
                        return `<strong>${author}</strong>`;
                    }
                    return author;
                }).join(',&nbsp\n');

                // Create venue and year
                let venueHTML = `<em>${pub.venue}</em>,&nbsp${pub.year}.&nbsp`;

                // Create tags
                let tagsHTML = `<font color="gray">${pub.tags}</font>`;

                // Create code link if available
                let codeHTML = '';
                if (pub.code) {
                    codeHTML = `<br>\n<a href="${pub.code}">code</a>`;
                }

                // Combine all parts
                p.innerHTML = `
                    ${titleHTML}
                    <br>
                    ${authorsHTML}
                    <br>
                    ${venueHTML}
                    <br>
                    ${tagsHTML}
                    ${codeHTML}
                `;

                container.appendChild(p);
            });
        })
        .catch(error => console.error('Error loading publications:', error));
});
