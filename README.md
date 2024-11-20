# Care2Share
## Description:
Welcome to 'Care2Share', an innovative web application dedicated to combating food scarcity and hunger on a global scale. Our platform serves as a dynamic hub where individuals, organizations, and NGOs come together to share and collect surplus food, organize events, donate resources, and raise awareness about pressing issues surrounding hunger relief. With a focus on community engagement and collaboration, Care2Share empowers users to make a meaningful impact in the fight against hunger."
 
## Key Features:
 
1. User Authentication and Profiles:
 
Users can sign up as individuals or organizations, such as a person, hotels, restaurants, and NGOs.
Each user has a personalized profile to manage their activities on the platform.
 
2. Surplus Food Sharing:
 
Individuals or businesses can post surplus food listings, specifying the location and the number of people it can feed.
NGOs can search for available food listings based on location and place orders for pickup.
 
3. Donation Platform:
 
Users can make monetary donations to NGOs through integrated payment gateways, supporting their hunger relief campaigns.
 
4. Event Management:
 
NGOs can create and publish events for food distribution, allowing users to volunteer and participate in community initiatives.
Users can search for events based on location and volunteer to contribute their time and resources.
 
5. Blogging and Awareness Campaigns:
 
Users can publish blogs addressing food scarcity and hunger relief, sharing insights, experiences, and solutions.
The platform facilitates user engagement through likes and comments to amplify awareness efforts.
 
6. Email Notifications & Map Functionality:
 Users receive email notifications after creating Foodposts. NGO users get email notifications after booking the food post with map locations which leverages Google Map API and EmailJS.

## Object Model

```mermaid

---
title: Object Model for Care2Share 
---


classDiagram
  class FoodPost {
    -int fp_id
    -String name
    -int numOfPeople
    -String shelfLife
    -Date timestamp
    -String status
    -String description

    + int getFpId()
    + void setFpId(int fp_id)
    + String getName()
    + void setName(String name)
    + int getNumOfPeople()
    + void setNumOfPeople(int numOfPeople)
    + String getShelfLife()
    + void setShelfLife(String shelfLife)
    + Date getTimestamp()
    + void setTimestamp(Date timestamp)
    + String getStatus()
    + void setStatus(String status)
    + String getDescription()
    + void setDescription(String description)
  }

  class Events {
    -int event_id
    -String eventTitle
    -String description
    -Date timestamp

    + int getEventId()
    + void setEventId(int event_id)
    + String getEventTitle()
    + void setEventTitle(String eventTitle)
    + String getDescription()
    + void setDescription(String description)
    + Date getTimestamp()
    + void setTimestamp(Date timestamp)
  }

  class BlogPost {
    -int blog_id
    -String title
    -String content
    -Date createdDate
    -int likes
    -int dislikes

    + int getBlogId()
    + void setBlogId(int blog_id)
    + String getTitle()
    + void setTitle(String title)
    + String getContent()
    + void setContent(String content)
    + Date getCreatedDate()
    + void setCreatedDate(Date createdDate)
    + int getLikes()
    + void setLike(int likes)
    + int getDislikes()
    + void setDislikes(int dislikes)
  }

  class Donation {
    -int donation_id
    -double amount
    -Date timestamp

    + int getDonationId()
    + void setDonationId(int donation_id)
    + double getAmount()
    + void setAmount(double amount)
    + Date getTimestamp()
    + void setTimestamp(Date timestamp)
  }

  class Comment {
    -int comment_id
    -String content
    -Date createdDate

    + int getCommentId()
    + void setCommentId(int comment_id)
    + String getContent()
    + void setContent(String content)
    + Date getcreatedDate()
    + void setcreatedDate(Date createdDate)
  }

  class User {
    -int user_id
    -String username
    -String email
    -String password
    -String role
    -String contactNo

    + int getUserId()
    + void setUserId(int user_id)
    + String getUsername()
    + void setUsername(String username)
    + String getEmail()
    + void setEmail(String email)
    + String getPassword()
    + void setPassword(String password)
    + String getRole()
    + void setRole(String role)
    + String getContactNo()
    + void setContactNo(String contactNo)
  }

  class Address {
    <<value object>>
    -String line1
    -String line2
    -String city
    -String state
    -String zipCode
    -String country

    + String getLine1()
    + void setLine1(String line1)
    + String getLine2()
    + void setLine2(String line2)
    + String getCity()
    + void setCity(String city)
    + String getState()
    + void setState(String state)
    + String getZipCode()
    + void setZipCode(String zipCode)
    + String getCountry()
    + void setCountry(String country)
  }

  class Person {
    -int person_id
    -String name
    -Date dob

    + int getPersonId()
    + void setPersonId(int person_id)
    + String getName()
    + void setName(String name)
    + Date getDob()
    + void setDob(Date dob)
  }

  class Organization {
    -int organization_id
    -String name
    -String type

    + int getOrganizationId()
    + void setOrganizationId(int organization_id)
    + String getName()
    + void setName(String name)
    + String getType()
    + void setType(String type)
  }

  FoodPost "0..n" *-- "1" User
  BlogPost "0..n" *-- "1" User
  Donation "0..n" *-- "1" User
  Donation "0..n" *-- "1" Organization
  Comment "0..n" *-- "1" User
  User <|-- Person
  User <|-- Organization
  User  o--  Address
  FoodPost "1" *-- "1" Address
  Events "0..n" *-- "1" Organization
  Comment "0..n" *-- "1" BlogPost
```


## Contributors

- Yugal Bharat Lakhyani: lakhyani.y@northeastern.edu
- Anup Balasaheb Pote: pote.a@northeastern.edu
- Sayantika Pal: pal.sayan@northeastern.edu
- Jayanti Hari: lnu.jay@northeastern.edu
