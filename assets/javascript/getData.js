// To create a new element
// type: 'tag' of new element, example:- div, a, img Fetch
// attribute: 'object' of all the attributes for that elelement
// content: 'text' content of the new Elements
// child: 'array' of the child of this element
function createElement(type, attribute = null, content = null, child = null) {
  let element = document.createElement(type)

  // Add content to element
  if (content != null) {
    element.innerHTML += content;
  }

  // Set attributes using loop
  // key will be name of attribute
  // value will be the value of attribute
  $.each(attribute, function(key, value) {
    element.setAttribute(key, value)
  })

  // add child by appending them
  $.each(child, function(key, value) {
    if(typeof value ===  'object'){
        element.appendChild(value)
    }else{
        element.innerHTML += value
    }
  })

  // return back the element
  return element
}

function createLinks(links) {
  let stack = [];

  $.each(links, function(key, value) {
    if (links[key].active == true) {
      let finalForm = []
      let content = links[key].label

      finalForm.push(createElement("img", {
        "src": links[key].iconUrl,
        "alt": links[key].name
      }))

      if (links[key].url != "") {
        finalForm.push(createElement("a", {
          "href": links[key].url
        }, links[key].label))
        content = null
      }

      stack.push(createElement("div", {
        "class": "link"
      }, content, finalForm))
    }
  })

  return stack;
}

function createLi(data){
  let str = "<ul>"
  $.each(data, function(key, value){
    str += "<li>" + value + "</li>"
  })
  str += "</ul>"

  return str
}

function createItems(data, locationEnable = true) {
  let item = []
  $.each(data, function(key, value) {
    let subItems = []
    let display = true;

    //iallow display
    if (value.hasOwnProperty("complete")) {
      //if complete is false
      if (!value.complete) {
        display = false;
      }
    }

    if (display) {

      //heading
      if (value.hasOwnProperty('url') && value.hasOwnProperty('name')) {
        subItems.push(createElement("div", {
          "class": "item_heading"
        }, null, [createElement("a", {
          "href": value.url
        }, value.name)]))
      }

      if (value.hasOwnProperty('url') && value.hasOwnProperty('institute')) {
        subItems.push(createElement("div", {
          "class": "item_heading"
        }, null, [createElement("a", {
          "href": value.url
        }, value.institute)]))
      }

      if (value.hasOwnProperty('url') && value.hasOwnProperty('projectUrl') && value.hasOwnProperty('title') && value.hasOwnProperty('projectTitle')) {
        subItems.push(createElement("div", {
          "class": "item_heading"
        }, null, [
          createElement("a", {
            "href": value.url
          }, value.title),
          createElement("a", {
            "href": value.projectUrl
          }, " | " + value.projectTitle)
        ]))
      } else if (value.hasOwnProperty('url') && value.hasOwnProperty('title')) {
        subItems.push(createElement("div", {
          "class": "item_heading"
        }, null, [createElement("a", {
          "href": value.url
        }, value.title)]))
      }



      // subheading
      if (value.hasOwnProperty('type')) {
        subItems.push(createElement("div", {
          "class": "item_subheading"
        }, value.type))
      }

      if (value.hasOwnProperty('role')) {
        subItems.push(createElement("div", {
          "class": "item_subheading"
        }, value.role))
      }

      if (value.hasOwnProperty('location') && locationEnable) {
        subItems.push(createElement("div", {
          "class": "item_subheading"
        }, value.location))
      }

      if (value.hasOwnProperty('level')) {
        subItems.push(createElement("div", {
          "class": "item_subheading"
        }, value.level))
      }

      if (value.hasOwnProperty('from')) {
        subItems.push(createElement("div", {
          "class": "item_subheading"
        }, value.from))
      }

      // timeline
      if(value.hasOwnProperty('timeline')){
        subItems.push(createElement("div", {
          "class": "item_timeline"
        }, value.timeline))
      }

      //tags
      if (value.hasOwnProperty('tag')) {
        let tags = []

        $.each(value.tag, function(key, value) {
          tags.push(createElement("div", {
            "class": "tag"
          }, value))
        })

        subItems.push(createElement("div", {
          "class": "item_tags"
        }, null, tags))
      }

      //Details
      let details = []
      if(value.hasOwnProperty('about')){
        details.push(value.about)
      }

      if(value.hasOwnProperty('coursework')){
        if(0 < value.coursework.length){
          details.push("<b>Coursework</b>" + createLi(value.coursework) )
        }
      }

      if(value.hasOwnProperty('awards')){
        if(0 < value.awards.length){
          details.push("<b>Awards</b>" + createLi(value.awards) )
        }
      }

      if(value.hasOwnProperty('activities')){
        if(0 < value.activities.length){
          details.push("<b>Activities</b>" + createLi(value.activities) )
        }
      }

      subItems.push(createElement("div", {
        "class": "item_details"
      }, null , details))


      //Finishing off
      let workItem = createElement("div", {
        "class": "item"
      }, null, subItems)

      item.push(workItem)
    }
  })

  return item;
}

function pushData(boxes, elements) {
  // Adding all the nodes
  $.each(boxes, function(key1, value1) {
    $.each(elements[key1], function(key2, value2) {
      boxes[key1].append(value2);
    });
  });
}

function createSkills(skills){
    let skillsList = []

      $.each(skills.data, function(key,value){
        skillsList.push(createElement("div", {
          "class": "skill_subheading",
          "style": "color:" + skills.color[key]
        }, skills.title[key]))

       $.each(value, function(key1,value1){
            skillsList.push("<div class='skillbar clearfix' data-percent='" + value1.percent + "%'>" +
                      "<div class='skillbar-title'><span>" + value1.name + "</span></div>" +
                      "<div class='skillbar-bar' style='background: " + skills.color[key] + "'></div>" +
                    "</div>");
        })
      })

      skillsList.push(createElement("div", {
        "class": "item_note"
      }, "*Skill still learning"))

    return skillsList
}

// To display all the infromation from the json file
function setData(data) {
  let profile_elements = [];
  let welcome_elements = [];

  // Minor elements
  let profile_image = createElement("img", {
    "src": data.profile.image
  });

  // profile_elements
  profile_elements.push(createElement("div", {
    "class": "profile_pic"
  }, null, [profile_image]))

  profile_elements.push(createElement("h1", {
    "class": "profile_name"
  }, data.profile.name))

  profile_elements.push(createElement("h2", {
    "class": "profile_domains"
  }, data.profile.domains))

  profile_elements.push(createElement("div", {
    "class": "profile_about"
  }, data.profile.vision))

  profile_elements.push(createElement("div", {
    "class": "profile_links"
  }, null, createLinks(data.profile.link)))

  // Welcome_elements
  welcome_elements.push(createElement("div", {
    "class": "super_heading"
  }, data.home.title))

  welcome_elements.push(createElement("div", {
    "class": "super_details"
  }, data.home.body))

  // Work elelements
  let work_elements = createItems(data.work, false)
  // project elements
  let project_elements = createItems(data.projects)
  // achievements elements
  let achievement_elements = createItems(data.achievements)
  // Blog elements
  let blog_elements = createItems(data.blog)
  // courses Elements
  let courses_elements = createItems(data.courses)
  // interests elements
  let interests = ""
  $.each(data.interests, function(key, value){
      interests += value + " <br>"
  })
  let interests_heading = [createElement("div", {
    "class": "item_heading"
  }, interests)]

  let interests_elements =  [createElement("div", {
    "class": "item"
  }, null , interests_heading)]
  // education
  let education_elements = createItems(data.education)
  // skills
  let skills_elements = [createElement("div", {
    "class": "item skills_item"
  }, null , createSkills(data.skills))]


  // store boxes and respactive data
  let boxes = [
    $("#profile_box"),
    $("#welcome_section"),
    $("#work_section"),
    $("#projects_section"),
    $("#achievements_section"),
    $("#interests_section"),
    $("#courses_section"),
    $("#education_section"),
    $("#skills_section"),
    $("#blog_section")
  ]
  let elements = [
    profile_elements,
    welcome_elements,
    work_elements,
    project_elements,
    achievement_elements,
    interests_elements,
    courses_elements,
    education_elements,
    skills_elements,
    blog_elements
  ]

  // To push it to html page
  pushData(boxes, elements);
  animateSkills();
}

// To check is document is ready
$(document).ready(function() {

  // Fetch the data.json file and handle various situations
  let test = $.getJSON("data.json", function(data) {
    console.log("~File access complete.")
  }).done(function(data) {
    // To display fetched data
    setData(data);
    console.log("~Fetching complete.")
  }).fail(function(data, textStatus, error) {
    console.log("~Getting Error in getting JSON.")
    console.error("getJSON failed, status: " + textStatus + ", error: " + error)
  }).always(function() {
    console.log("~Always complete.");
  })

})
