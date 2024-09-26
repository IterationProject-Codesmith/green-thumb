// import DashBoard from './DashBoard';
// import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import {render, screen} from '@testing-library/react';
// import '@testing-library/jest-dom';
// // import userEvent from '@testing-library/user-event';
// import { Provider } from 'react-redux';


// describe('DashBoard', () => {
//       let text;
//       const props = {
//         label: 'Mega',
//         text: 'Markets',
//        };
//     beforeAll(() => {
//         render(<DashBoard {...props}/>);
//     })
//     it('renders dashboard', () =>{
//         expect()
//     })

// })

// describe('Unit testing React components', () => {
//   describe('LabeledText', () => {
//     let text;
//     const props = {
//       label: 'Mega',
//       text: 'Markets',
//     };

//     beforeAll(() => {
//       text = render(<LabeledText {...props} />);
//     });

//     test('Renders the passed-in text with the label in bold', () => {
//       expect(text.getByText('Mega:').nextSibling).toHaveTextContent('Markets');
//       expect(text.getByText('Mega:')).toHaveStyle('font-weight: bold');
//     });
//   });