/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client'

export const GET_USER = gql`
  query User($_id: ID!) {
    user(_id: $_id) {
      _id
      name
      title
      picture
      bio
      contact {
        location
        phone
        mail
        linkedin
        github
        twitter
      }
      professionalExperience {
        company
        jobTitle
        location
        startYear
        endYear
        description
        currentJob
        techStack
      }
      skills {
        name
        scale
      }
      education {
        degree
        school
        startYear
        endYear
      }
      developerCommunityInvolement {
        title
        description
      }
      languages
      hobbies
      sports
      countriesICanWork
    }
  }
`

export const GET_FREELANCER_CARDS = gql`
  query Freelancers($_id: [ID!]!) {
    freelancers(_id: $_id) {
      _id
      name
      title
      picture
      bio
      contact {
        location
        phone
        mail
        linkedin
        github
        twitter
      }
      professionalExperience {
        company
        jobTitle
        location
        startYear
        endYear
        description
        currentJob
        techStack
      }
      skills {
        name
        scale
      }
      education {
        degree
        school
        startYear
        endYear
      }
      developerCommunityInvolement {
        title
        description
      }
      languages
      hobbies
      sports
      countriesICanWork
    }
  }
`

export const GET_USER_AND_COUNTRIES = gql`
  query User($_id: ID!) {
    user(_id: $_id) {
      name
      title
      picture
      bio
      contact {
        location
        phone
        mail
        linkedin
        github
        twitter
      }
      professionalExperience {
        company
        jobTitle
        location
        startYear
        endYear
        description
        currentJob
        techStack
      }
      skills {
        name
        scale
      }
      education {
        degree
        school
        startYear
        endYear
      }
      developerCommunityInvolement {
        title
        description
      }
      languages
      hobbies
      sports
      countriesICanWork
    }
    countries {
      name
    }
  }
`

export const GET_USER_AND_PROPOSAL = gql`
  query User($_id: ID!, $proposalId: ID!) {
    user(_id: $_id) {
      name
      title
      picture
      bio
      contact {
        location
        phone
        mail
        linkedin
        github
        twitter
      }
      professionalExperience {
        company
        jobTitle
        location
        startYear
        endYear
        description
        currentJob
        techStack
      }
      skills {
        name
        scale
      }
      education {
        degree
        school
        startYear
        endYear
      }
      developerCommunityInvolement {
        title
        description
      }
      languages
      hobbies
      sports
      countriesICanWork
    }
    getProposalsById(_id: $proposalId) {
      _id
      coverLetter
      projectTitle
      proposedRate
      projectId
      currency
    }
  }
`

export const UPDATE_USER_BIO = gql`
  mutation UpdateUserBio($bio: String) {
    updateUserBio(bio: $bio) {
      bio
    }
  }
`

export const UPDATE_USER_AVATAR = gql`
  mutation UpdateUserPicture($picture: String) {
    updateUserPicture(picture: $picture) {
      name
      title
    }
  }
`

export const UPDATE_USER_CONTACT = gql`
  mutation UpdateUserContact($contact: ContactInput) {
    updateUserContact(contact: $contact) {
      contact {
        location
        phone
        mail
        linkedin
        github
        twitter
      }
    }
  }
`

export const UPDATE_USER_COUNTRIESICANWORK = gql`
  mutation UpdateUserCountriesICanWork($countriesICanWork: [String]) {
    updateUserCountriesICanWork(countriesICanWork: $countriesICanWork) {
      countriesICanWork
    }
  }
`

export const UPDATE_USER_DEVELOPERCOMUNITYINVOLVEMENT = gql`
  mutation UpdateUserDeveloperCommunityInvolement($developerCommunityInvolement: [DeveloperCommunityInvolementInput]) {
    updateUserDeveloperCommunityInvolement(developerCommunityInvolement: $developerCommunityInvolement) {
      developerCommunityInvolement {
        title
        description
      }
    }
  }
`

export const UPDATE_USER_EDUCATION = gql`
  mutation UpdateUserEducation($education: [EducationInput]) {
    updateUserEducation(education: $education) {
      education {
        degree
        school
        startYear
        endYear
      }
    }
  }
`
export const UPDATE_USER_HOBBIES = gql`
  mutation UpdateUserHobbies($hobbies: [String]) {
    updateUserHobbies(hobbies: $hobbies) {
      hobbies
    }
  }
`

export const UPDATE_USER_LANGUAGES = gql`
  mutation UpdateUserLanguages($languages: [String]) {
    updateUserLanguages(languages: $languages) {
      languages
    }
  }
`

export const UPDATE_USER_PROFESSIONALEXPERIENCE = gql`
  mutation UpdateUserProfessionalExperience($professionalExperience: [ProfessionalExperienceInput]) {
    updateUserProfessionalExperience(professionalExperience: $professionalExperience) {
      professionalExperience {
        company
        location
        jobTitle
        currentJob
        startYear
        endYear
        description
        techStack
      }
    }
  }
`

export const UPDATE_USER_SKILLS = gql`
  mutation UpdateUserSkills($skills: [SkillsInput]) {
    updateUserSkills(skills: $skills) {
      skills {
        name
        scale
      }
    }
  }
`

export const UPDATE_USER_SPORTS = gql`
  mutation UpdateUserSports($sports: [String]) {
    updateUserSports(sports: $sports) {
      sports
    }
  }
`

export const UPDATE_USER_NAMETITLE = gql`
  mutation UpdateUserNameTitle($name: String, $title: String) {
    updateUserNameTitle(name: $name, title: $title) {
      name
      title
    }
  }
`
