import { render, screen } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter, BrowserRouter as Router } from 'react-router-dom';
import { BASE_URL, getAuthHeaders, getCourseList } from '../Apis/Api';

import App from '../App';
import Courses from '../Pages/Courses/Courses';
import CourseClasses from '../Pages/CourseClasses/CourseClasses';

jest.mock("axios");
// method to verify that all HTMLElements are in document 
const expectAllInDocument = (elementArray) => {
  elementArray.map((target) => {
    expect(target).toBeInTheDocument();
  })
}

// mock local storage
const storageMock = () => {
let storage = {};
return {
  setItem: (key, value) => {
    storage[key] = value || '';
  },
  getItem: (key) => {
    return storage[key] || null;
  },
  removeItem: (key) => {
    delete storage[key];
  },
  clear: function () {
    storage = {};
  },
  getLength: () => {
    return Object.keys(storage).length;
  },
  key: function (i) {
    const keys = Object.keys(storage);
    return keys[i] || null;
  }
}
}

describe('Login', () => {
  test('Login Form', () => {
    render(<App />);
    const elementArray = screen.getAllByText(/Wonderful Group/);
    elementArray.push(screen.getByText(/Username/));
    elementArray.push(screen.getByRole('textbox', {
      name: 'name'
    }));
    elementArray.push(screen.getByText(/Password/));
    elementArray.push(screen.getByRole('textbox', {
      name: 'password'
    }));
    elementArray.push(screen.getByText(/Submit/));
    elementArray.push(screen.getByRole('button', {
      name: 'submit'
    }));
    expectAllInDocument(elementArray)

    // after logging in, create token in mock local storage
    window.localStorage = storageMock();
    window.localStorage.setItem('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYzNTMwNTc1MSwianRpIjoiNzcwYTQxMDUtYzUzNC00MTkzLTkxYjUtMzQ4MmNlZTRmYTUxIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MSwibmJmIjoxNjM1MzA1NzUxLCJleHAiOjE2MzU5MTA1NTEsInVzZXJfdHlwZSI6IkVORyJ9.WUoDmNxMO2T-WGkLWJjvByBWS4fW39BQZfditGptpN0')
  });
})

describe('Courses', () => {
  test('Courses', () => {
    render(
      <Router>
        <Courses />
      </Router>
    );
    const elementArray = screen.getAllByText(/Courses/)
    elementArray.push(screen.getByText(/Create a Course/))
    elementArray.push(screen.getByRole('button', {
      name: 'createCourse'
    }))
    elementArray.push(screen.getByText(/Delete Courses/))
    elementArray.push(screen.getByRole('button', {
      name: 'deleteCourses'
    }))
    expectAllInDocument(elementArray)
  })

  test('getCourseList', async () => {
    const testCourseList = [
      {
        course_id: 1,
        description: "Course one description",
        isActive: false,
        isComplete: false,
        isEligible: true,
        name: "course one name",
        self_enrollment_start_date: null,
        self_enrollment_end_date: null,
        prereqs: [],
      }
    ]

    const headers = getAuthHeaders();
    axios.get.mockResolvedValueOnce(testCourseList);
    const result = await getCourseList();
    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}api/v1/courses/0`, { headers });
    expect(result).toEqual(testCourseList);
  })
})

describe('CourseClasses', () => {
  test('CourseClasses', () => {
    render(
      <MemoryRouter initialEntries={[{pathname: "/courseclasses", state: {course_id: 1, courseName: "test course"}}]}>
        <CourseClasses />
      </MemoryRouter>
    );

    const elementArray = [];
    elementArray.push(screen.getByText(/Create a Class/));
    elementArray.push(screen.getByRole('button', {
      name: 'createCourseClass'
    }))
    expectAllInDocument(elementArray)
  })
})