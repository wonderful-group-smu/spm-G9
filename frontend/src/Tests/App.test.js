import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter, BrowserRouter as Router } from 'react-router-dom';
import { BASE_URL, getAuthHeaders, getCourseList, getCourseClasses, getClassContent } from '../Apis/Api';

import { expectAllInDocument, storageMock } from './testMethods.js';
import { testHrToken, testCourse, testCourseList, testCourseClass, testCourseClasses, testClassSection } from './testProps.js';

import App from '../App';
import Courses from '../Pages/Courses/Courses';
import CourseClasses from '../Pages/CourseClasses/CourseClasses';
import ClassDetails from '../Pages/ClassDetails/ClassDetails';

jest.mock("axios");

// test author: Edwin

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
    window.localStorage.setItem('token', testHrToken)
  });
})

describe('Courses', () => {
  test('getCourseList API', async () => {
    const headers = getAuthHeaders();
    axios.get.mockResolvedValueOnce(testCourseList);
    const result = await getCourseList();
    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}api/v1/courses/0`, { headers });
    expect(result).toEqual(testCourseList);
  })

  const axiosGet = (url) => {
    if (url.includes('courses')) {
      return Promise.resolve({
        data:
        {
          results: testCourseList
        }
      })
    }
  }

  test('Courses UI', async () => {
    axios.get.mockImplementation(axiosGet)
    render(
      <Router>
        <Courses />
      </Router>
    );

    const elementArray = await screen.findAllByText(/Courses/i)
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
})

describe('CourseClasses', () => {
  test('getCourseClasses API', async () => {
    const headers = getAuthHeaders();
    axios.get.mockResolvedValueOnce(testCourseClasses);
    const result = await getCourseClasses({ "course_id": testCourse.course_id });
    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}api/v1/course_classes/` + testCourse.course_id, { headers });
    expect(result).toEqual(testCourseClasses);
  })

  test('CourseClasses UI', async () => {
    axios.get.mockResolvedValueOnce({
      data:
      {
        course_classes: testCourseClasses
      }
    });
    render(
      <MemoryRouter initialEntries={[{ pathname: "/courseclasses", state: { course_id: testCourse.course_id, courseName: testCourse.name } }]}>
        <CourseClasses />
      </MemoryRouter>
    );

    const elementArray = [];
    elementArray.push(await screen.findByText(RegExp(testCourse.name)));
    elementArray.push(screen.getByText(/Create a Class/i));
    elementArray.push(screen.getByRole('button', {
      name: 'createCourseClass'
    }))
    expectAllInDocument(elementArray)
  })


})

describe('ClassDetails', () => {
  const classContentResponse = {
    data: {
      class_sections: [testClassSection]
    }
  }
  test('getClassContent API', async () => {
    const courseID = testCourse.course_id
    const trainerID = testCourseClass.trainer.trainer_id
    const employeeID = 3
    const headers = getAuthHeaders();
    axios.get.mockResolvedValueOnce(classContentResponse);
    const result = await getClassContent(courseID, trainerID);
    expect(axios.get)
      .toHaveBeenCalledWith(
        `${BASE_URL}api/v1/class_sections/${courseID}&${trainerID}&${employeeID}`, { headers }
      );
    expect(result).toEqual(classContentResponse);
  })

  test('ClassDetails UI', async () => {
    axios.get.mockImplementation((url) => {
      if (url.includes('enroll')) {
        return Promise.resolve({
          data:
          {
            msg: 'no enrollment record retrieved'
          }
        })
      }
      else if (url.includes('class_sections')) {
        return Promise.resolve(classContentResponse)
      }
    })

    render(
      <MemoryRouter initialEntries={[{ pathname: "/courseclasses", state: { courseClass: testCourseClass } }]}>
        <ClassDetails />
      </MemoryRouter>
    );

    const elementArray = [];
    elementArray.push(await screen.findByText(testCourseClass.course.name));
    elementArray.push(screen.getByText(/Class Details/i));
    elementArray.push(screen.getByText(RegExp(testCourseClass.start_date.slice(0, 10))));
    elementArray.push(screen.getByText(RegExp(testCourseClass.end_date.slice(0, 10))));
    elementArray.concat(screen.getAllByText(RegExp(testCourseClass.class_size)));

    elementArray.push(screen.getByText(/Our Trainer/i));
    elementArray.concat(screen.getAllByText(RegExp(testCourseClass.trainer.name)));

    elementArray.push(screen.getByText("Sections"));
    elementArray.push(screen.getByText(/Add a Section/i));
    elementArray.push(screen.getByRole('button', {
      name: 'createSection'
    }))

    expectAllInDocument(elementArray)
  })
})