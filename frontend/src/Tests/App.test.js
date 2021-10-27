import { render, screen } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter, BrowserRouter as Router } from 'react-router-dom';
import { BASE_URL, getAuthHeaders, getCourseList } from '../Apis/Api';

import { expectAllInDocument, storageMock } from './testMethods.js';
import { testCourse, testCourseClass } from './testProps.js';

import App from '../App';
import Courses from '../Pages/Courses/Courses';
import CourseClasses from '../Pages/CourseClasses/CourseClasses';
import ClassDetails from '../Pages/ClassDetails/ClassDetails';

jest.mock("axios");

describe('Login', () => {
  test('Login Form', () => {
    render(<App />);
    const elementArray = screen.getAllByText(/Wonderful Group/i);
    elementArray.push(screen.getByText(/Username/i));
    elementArray.push(screen.getByRole('textbox', {
      name: 'name'
    }));
    elementArray.push(screen.getByText(/Password/i));
    elementArray.push(screen.getByRole('textbox', {
      name: 'password'
    }));
    elementArray.push(screen.getByText(/Submit/i));
    elementArray.push(screen.getByRole('button', {
      name: 'submit'
    }));
    expectAllInDocument(elementArray) // verifies that all elements are in document

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
    const elementArray = screen.getAllByText(/Courses/i)
    elementArray.push(screen.getByText(/Create a Course/i))
    elementArray.push(screen.getByRole('button', {
      name: 'createCourse'
    }))
    elementArray.push(screen.getByText(/Delete Courses/i))
    elementArray.push(screen.getByRole('button', {
      name: 'deleteCourses'
    }))
    expectAllInDocument(elementArray)
  })

  test('getCourseList', async () => {
    const testCourseList = [
      testCourse,
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
      <MemoryRouter initialEntries={[{pathname: "/courseclasses", state: {course_id: testCourse.course_id, courseName: testCourse.name}}]}>
        <CourseClasses />
      </MemoryRouter>
    );

    const elementArray = [];
    elementArray.push(screen.getByText(RegExp(testCourse.name)));
    elementArray.push(screen.getByText(/Create a Class/i));
    elementArray.push(screen.getByRole('button', {
      name: 'createCourseClass'
    }))
    expectAllInDocument(elementArray)
  })
})

describe('ClassDetails', () => {
  test('ClassDetails', () => {
    render(
      <MemoryRouter initialEntries={[{pathname: "/courseclasses", state:{ courseClass: testCourseClass }}]}>
        <ClassDetails />
      </MemoryRouter>
    );

    const elementArray = [];
    elementArray.push(screen.getByText(RegExp(testCourseClass.course.name)));
    elementArray.push(screen.getByText(/Enroll Now/i));
    elementArray.push(screen.getByRole('button', {
      name: 'selfEnroll'
    }))

    elementArray.push(screen.getByText(/Class Details/i));
    elementArray.push(screen.getByText(RegExp(testCourseClass.start_date.slice(0,10))));
    elementArray.push(screen.getByText(RegExp(testCourseClass.end_date.slice(0,10))));
    elementArray.concat(screen.getAllByText(RegExp(testCourseClass.class_size)));

    elementArray.push(screen.getByText(/Our Trainer/i));
    elementArray.concat(screen.getAllByText(RegExp(testCourseClass.trainer.name)));
    
    elementArray.push(screen.getByText(/Sections/i));
    elementArray.push(screen.getByText(/Add a Section/i));
    elementArray.push(screen.getByRole('button', {
      name: 'createSection'
    }))

    expectAllInDocument(elementArray)
  })
})