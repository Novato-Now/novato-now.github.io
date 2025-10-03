  //   Privacy policy redering
  
  fetch('Json/termsandcondition.json')
    .then(response => response.json()) // Parse the JSON file
    .then(data => {
      renderContent(data); // Call the renderContent function with the fetched data
    })
    .catch(error => {
      console.error('Error loading privacy policy:', error);
    });
  
  // Function to render content
  function renderContent(data) {
    const contentDiv = document.getElementById('content');
    contentDiv.classList.add('heading-text');
  
    const titleElement = document.getElementById('page-title');
    titleElement.textContent = data.title;
    // Add a CSS class to style the title
    titleElement.classList.add('title-text');
    titleElement.style.marginTop = '16px';
    titleElement.style.marginBottom = '32px';
    // Render sections
    data.sections.forEach((section, sectionIndex) => {
      const sectionDiv = document.createElement('div');
      sectionDiv.classList.add('heading-text');
      sectionDiv.style.marginBottom = '40px';
      // Section heading with anchor link
      const sectionHeading = document.createElement('h3');
      sectionHeading.classList.add('heading-text', 'mt-3', 'mb-3');
      const sectionAnchor = document.createElement('a');
      sectionAnchor.href = `#section-${sectionIndex + 1}`; // Create anchor link
      sectionAnchor.id = `section-${sectionIndex + 1}`; // Set ID for navigation
      sectionAnchor.textContent = section.heading;
  
      // Apply heading-text class styles to anchor links
      sectionAnchor.style.color = 'inherit'; // Inherit color from parent
      sectionAnchor.style.textDecoration = 'none'; // Remove underline
      sectionAnchor.classList.add('heading-text');
  
      sectionHeading.appendChild(sectionAnchor);
      sectionDiv.appendChild(sectionHeading);
  
      // Section content
      if (section.content) {
        renderContentItems(section.content, sectionDiv);
      }
  
      // Subsections
      if (section.subSections) {
        section.subSections.forEach((subSection, subSectionIndex) => {
          const subSectionDiv = document.createElement('div');
          subSectionDiv.classList.add('subheading-text');
          subSectionDiv.style.marginBottom = '28px';

          const subHeading = document.createElement('h5');
          const subSectionAnchor = document.createElement('a');
          subSectionAnchor.href = `#sub-section-${sectionIndex + 1}-${subSectionIndex + 1}`; // Create anchor link
          subSectionAnchor.id = `sub-section-${sectionIndex + 1}-${subSectionIndex + 1}`; // Set ID for navigation
          subSectionAnchor.textContent = subSection.subHeading;
  
          // Apply heading-text class styles to anchor links
          subSectionAnchor.style.color = 'inherit'; // Inherit color from parent
          subSectionAnchor.style.textDecoration = 'none'; // Remove underline
          subSectionAnchor.classList.add('subheading-text');
          
  
          subHeading.appendChild(subSectionAnchor);
          subSectionDiv.appendChild(subHeading);
  
          renderContentItems(subSection.content, subSectionDiv);
  
          sectionDiv.appendChild(subSectionDiv);
        });
      }
  
      contentDiv.appendChild(sectionDiv);
    });
  }
  
  // Helper function to render paragraphs and bullet lists
  function renderContentItems(items, parentElement) {
    items.forEach((item) => {
      if (item.type === 'paragraph') {
        const paragraph = document.createElement('p');
        paragraph.textContent = item.text;
        paragraph.classList.add('paragraph-text'); // Add CSS class for styling
        parentElement.appendChild(paragraph);
      } else if (item.type === 'bullet') {
        const ul = document.createElement('ul');
        ul.classList.add('paragraph-text', 'bullet-list');  // Add CSS class for styling
  
        item.items.forEach((bullet) => {
          const li = document.createElement('li');
          li.classList.add('paragraph-text', 'bullet-list');
  
          // Create the heading (bold)
          const heading = document.createElement('b');
          heading.classList.add('paragraph-text'); // Add class for heading style
          heading.textContent = bullet.heading;
  
          // Create the content (normal paragraph)
          const content = document.createElement('span');
          content.classList.add('paragraph-text'); // Add class for content style
          content.textContent = bullet.content;
  
          // Append heading and content into the list item
          li.appendChild(heading);
          li.appendChild(content);
          ul.appendChild(li);
        });
  
        parentElement.appendChild(ul);
      }
    });
  }
  

  
    //Categories sidebar
  
    // document.addEventListener("DOMContentLoaded", function () {
    //     const categories = [
    //         {
    //           heading: "Introduction",
    //           subSections: []
    //         },
    //         {
    //           heading: "Eligibility",
    //           subSections: [
    //           ]
    //         },
    //         {
    //           heading: "User Account",
    //           subSections: ["Account Creation","Account Security"
               
    //           ]
    //         },
    //         {
    //           heading: "User Conduct",
    //           subSections: []
    //         },
    //         {
    //           heading: "Content Ownership and Licenses",
    //           subSections: ["Your Content","Our Content"]
    //         },
    //         {
    //           heading: "Termination",
    //           subSections: []
    //         },
    //         {
    //           heading: "Disclaimers and Limitation of Liability",
    //           subSections: ["Disclaimers","Limitation of Liability"]
    //         },
    //         {
    //           heading: "Indemnification",
    //           subSections: []
    //         },
    //         {
    //           heading: "Governing Law",
    //           subSections: []
    //         },
    //         {
    //           heading: "Changes to These Terms",
    //           subSections: []
    //         },
    //         {
    //           heading: "Contact Us",
    //           subSections: []
    //         }
    //       ];
      
    //     const categoryList = document.getElementById("category-list");
      
    //     categories.forEach((category, index) => {
    //       const li = document.createElement("li");
    //       const a = document.createElement("a");
    //       const span = document.createElement("span");
    //       span.classList.add("text");
    //       span.textContent = `${index + 1}. ${category.heading}`;
      
    //       // Add the arrow image for sections with sub-sections
    //       let arrowImg;
    //       if (category.subSections.length > 0) {
    //         arrowImg = document.createElement("img");
    //         arrowImg.src = "Assets/arrow-down.svg"; // Initially pointing right
    //         arrowImg.alt = "Expand/Collapse";
    //         arrowImg.classList.add("arrow-img"); // Add a CSS class for styling
    //       }
      
    //       // Set the href for the main category link
    //       a.href = `#section-${index + 1}`; // Link to section using the index
    //       a.appendChild(span);
    //       if (category.subSections.length > 0) {
    //         a.appendChild(arrowImg); // Append the arrow at the end of the text
    //       }
      
    //       // Create sub-menu for sections that have sub-sections
    //       if (category.subSections.length > 0) {
    //         const subMenu = document.createElement("ul");
    //         subMenu.classList.add("sub-menu"); // Initially hidden via JS
      
    //         // Apply custom styles to the sub-menu
    //         subMenu.style.display = "none"; // Hide the sub-menu initially
    //         subMenu.style.marginLeft = "20px";
    //         subMenu.style.paddingLeft = "20px";
    //         subMenu.style.paddingTop = "5px";
    //         subMenu.style.borderLeft = "1px solid #f6f6f6";
    //         subMenu.style.fontSize = "14px"; // Custom font size for sub-menu items
      
    //         category.subSections.forEach((subSection, subIndex) => {
    //           const subLi = document.createElement("li");
    //           const subA = document.createElement("a");
      
    //           subA.href = `#sub-section-${index + 1}-${subIndex + 1}`; // Link to sub-section using the section and sub-section index
    //           subA.innerHTML = `<span class="text">${subSection}</span>`;
    //           subLi.appendChild(subA);
    //           subMenu.appendChild(subLi);
    //         });
      
    //         li.appendChild(a);
    //         li.appendChild(subMenu);
    //         categoryList.appendChild(li);
      
    //         // Add click event to toggle sub-menu visibility
    //         a.addEventListener("click", function (event) {
    //           event.preventDefault(); // Prevent default anchor behavior
    //           if (subMenu.style.display === "none") {
    //             subMenu.style.display = "block"; // Show the sub-menu
    //             arrowImg.src = "Assets/arrow-up.svg"; // Change image to up arrow
    //           } else {
    //             subMenu.style.display = "none"; // Hide the sub-menu
    //             arrowImg.src = "Assets/arrow-down.svg"; // Change image to down arrow
    //           }
    //         });
    //       } else {
    //         li.appendChild(a);
    //         categoryList.appendChild(li);
    //       }
    //     });
    //   });
      
      

      // Fetch the privacy-policy.json file and create the search bars
document.addEventListener("DOMContentLoaded", () => {
    fetch('Json/termsandcondition.json')
      .then((response) => response.json())
      .then((data) => {
        const container1 = document.getElementById("searchBar1");
        const container2 = document.getElementById("searchBar2");
  
        createSearchBar(container1, data);
        createSearchBar(container2, data);
      })
      .catch((error) => {
        console.error("Error loading privacy policy:", error);
      });
  });
  


  /* Search bar script */
// Function to create a search bar
// function createSearchBar(container, data) {
//     const searchBarHTML = `
//       <div class="search-bar mb-3">
//         <input
//           type="text"
//           placeholder="Type something..."
//           class="search-input"
//         />
//         <img class="search-icon" src="Assets/search.png" alt="search" />
//         <div class="dropdown"></div>
//       </div>
//     `;
  
//     container.innerHTML = searchBarHTML;
  
//     // Populate the dropdown with data from the privacy-policy.json file
//     const dropdown = container.querySelector(".dropdown");
  
//     // Helper function to process and add content
//     function addContentToDropdown(sectionId, content, prefix = "") {
//       content.forEach((item, contentIndex) => {
//         if (item.type === "paragraph") {
//           const paragraphAnchor = document.createElement("a");
//           paragraphAnchor.href = `#${sectionId}-paragraph-${contentIndex + 1}`; 
//           paragraphAnchor.textContent = `${prefix}${item.text.substring(0, 50)}...`; // Display first 50 characters
//           dropdown.appendChild(paragraphAnchor);
//         } else if (item.type === "bullet") {
//           item.items.forEach((bullet, bulletIndex) => {
//             const bulletAnchor = document.createElement("a");
//             bulletAnchor.href = `#${sectionId}-bullet-${bulletIndex + 1}`;
//             bulletAnchor.textContent = `${prefix}${bullet.heading}`;
//             dropdown.appendChild(bulletAnchor);
//           });
//         }
//       });
//     }
  
//     data.sections.forEach((section, sectionIndex) => {
//       const sectionId = `section-${sectionIndex + 1}`;
  
//       // Add section heading
//       const sectionAnchor = document.createElement("a");
//       sectionAnchor.href = `#${sectionId}`;
//       sectionAnchor.textContent = section.heading;
//       dropdown.appendChild(sectionAnchor);
  
//       // Add section content
//       if (section.content) {
//         addContentToDropdown(sectionId, section.content);
//       }
  
//       // Add subsections
//       if (section.subSections) {
//         section.subSections.forEach((subSection, subSectionIndex) => {
//           const subSectionId = `${sectionId}-sub-${subSectionIndex + 1}`;
//           const subSectionAnchor = document.createElement("a");
//           subSectionAnchor.href = `#${subSectionId}`;
//           subSectionAnchor.textContent = `${section.heading} - ${subSection.subHeading}`;
//           dropdown.appendChild(subSectionAnchor);
  
//           // Add subsection content
//           if (subSection.content) {
//             addContentToDropdown(subSectionId, subSection.content, `${subSection.subHeading}: `);
//           }
//         });
//       }
//     });
  
//     // Attach event listeners for functionality
//     const searchInput = container.querySelector(".search-input");
//     const links = dropdown.getElementsByTagName("a");
  
//     searchInput.addEventListener("input", () => {
//       const filter = searchInput.value.toLowerCase();
//       let hasResults = false;
  
//       for (let link of links) {
//         const text = link.textContent.toLowerCase();
//         if (text.includes(filter)) {
//           link.style.display = "block";
//           hasResults = true;
//         } else {
//           link.style.display = "none";
//         }
//       }
  
//       dropdown.style.display = hasResults ? "flex" : "none";
//     });
  
//     document.addEventListener("click", (e) => {
//       if (!e.target.closest(".search-bar")) {
//         dropdown.style.display = "none";
//       }
//     });
//   }
  
  