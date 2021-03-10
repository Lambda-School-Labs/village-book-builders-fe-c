import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
//import { useParams, useHistory } from 'react-router-dom';
import {
  Form,
  Input,
  Checkbox,
  DatePicker,
  Radio,
  Button,
  Row,
  Col,
} from 'antd';
import moment from 'moment';
//import { debugLog } from '../../../../utils/debugMode';
import {
  fetchMenteeProfile as fetchMenteeProfileAction,
  editMenteeProfile as editMenteeProfileAction,
} from '../../../../state/actions';
import '../../../../style.css';

// let initialState = {
//   first_name: '',
//   last_name: '',
//   gender: '',
//   dob: '',
//   mentee_picture: 'http://placeimg.com/640/480',
//   english_lvl: '',
//   math_lvl: '',
//   reading_lvl: '',
//   school_lvl: '',
//   academic_description: '',
//   support_needed: '',
//   primary_language: '',
//   availability: {
//     time_zone: '',
//     as_early_as: '',
//     as_late_as: '',
//     methods: [],
//   },
//   email: '',
//   dynamic_questions: [
//     {
//       qId: 0,
//       question: 'My favorite thing to do in my free time is',
//     },
//     {
//       qId: 1,
//       question: 'When I grow up, I want to be',
//     },
//     {
//       qId: 2,
//       question: 'Goals & Dreams Notes',
//     },
//     {
//       qId: 3,
//       question: 'Personal Struggles Notes',
//     },
//     {
//       qId: 4,
//       question: 'Other interests/hobbies',
//     },
//     {
//       qId: 5,
//       question: 'Skills Notes',
//     },
//     {
//       qId: 6,
//       question: 'Family Notes',
//     },
//     {
//       qId: 7,
//       question: 'Other Notes',
//     },
//     {
//       qId: 8,
//       question: 'Admin Notes',
//     },
//   ],
// };

const EditMenteeForm = ({
  currentMentee,
  isLoading,
  message,
  onedit,
  loading,
}) => {
  //   debugLog(
  //     'Prop drilled from Mentees.js',
  //     currentMentee,
  //     moment.utc(currentMentee.dob).format('dddd, MMMM Do of YYYY')
  //   );
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [formData, setFormData] = useState(currentMentee);

  useEffect(() => {
    setFormData(currentMentee);
    form.setFieldsValue({
      first_name: currentMentee.first_name,
      last_name: currentMentee.last_name,
      gender: currentMentee.gender,
      email: currentMentee.email,
      dob: moment(currentMentee.dob),
      english_lvl: currentMentee.english_lvl,
      math_lvl: currentMentee.math_lvl,
      reading_lvl: currentMentee.reading_lvl,
      school_lvl: currentMentee.school_lvl,
      academic_description: currentMentee.academic_description,
      support_needed: currentMentee.academic_description,
      primary_language: currentMentee.primary_language,
      time_zone: currentMentee.availability.time_zone,
      as_early_as: currentMentee.availability.as_early_as,
      as_late_as: currentMentee.availability.as_late_as,
      0: currentMentee.dynamic_questions[0].answer,
      1: currentMentee.dynamic_questions[1].answer,
      2: currentMentee.dynamic_questions[2].answer,
      3: currentMentee.dynamic_questions[3].answer,
      4: currentMentee.dynamic_questions[4].answer,
      5: currentMentee.dynamic_questions[5].answer,
      6: currentMentee.dynamic_questions[6].answer,
      7: currentMentee.dynamic_questions[7].answer,
      8: currentMentee.dynamic_questions[8].answer,
    });
  }, [currentMentee, form]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e, i) => {
    setFormData({
      ...formData,
      availability: { ...formData.availability, methods: e },
    });
  };

  const handleQuestionsChange = e => {
    if (
      !Object.keys(formData.dynamic_questions).find(
        key => formData.dynamic_questions['qId'] === e.target.id
      )
    ) {
      formData.dynamic_questions[parseInt(e.target.id)].answer = e.target.value;
    }
  };

  const handleSubmit = async e => {
    await onedit(formData);
    form.resetFields();
  };

  // console.log('current in edit form', currentMentee);
  //console.log('formData', formData);
  //console.log('methods', currentMentee.availability.methods);

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <p>{currentMentee.first_name}</p>
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[{ required: true, message: 'First Name is required.' }]}
          >
            <Input
              type="text"
              name="first_name"
              value={currentMentee ? currentMentee.first_name : ''}
              onChange={e => handleChange(e)}
            />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[{ required: true, message: 'Last Name is required.' }]}
          >
            <Input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={e => handleChange(e)}
            />
          </Form.Item>
          <Form.Item label="Gender" name="gender">
            <Radio.Group
              name="gender"
              value={formData.gender}
              onChange={e => handleChange(e)}
            >
              <Radio value="Male">Male</Radio>
              <Radio value="Female">Female</Radio>
              <Radio value="Other">Other</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Email Address"
            name="email"
            rules={[{ required: true, message: 'Email Address is required.' }]}
          >
            <Input
              type="text"
              name="email"
              value={formData.email}
              onChange={e => handleChange(e)}
            />
          </Form.Item>
          <Form.Item
            label="Primary Language"
            name="primary_language"
            rules={[{ required: true, message: 'Phone Number is required.' }]}
          >
            <Input
              type="text"
              name="primary_language"
              value={formData.primary_language}
              onChange={e => handleChange(e)}
            />
          </Form.Item>
          <Form.Item
            label="Date of Birth"
            name="dob"
            rules={[{ required: true, message: 'Date of Birth is required.' }]}
          >
            <DatePicker
              value={formData.dob}
              onChange={(e, date) => {
                setFormData({ ...formData, dob: date });
              }}
            />
          </Form.Item>
          <Form.Item
            label="English Level"
            name="english_lvl"
            rules={[{ required: true, message: 'English level is required.' }]}
          >
            <Input
              type="number"
              name="english_lvl"
              value={formData.english_lvl}
              onChange={e => handleChange(e)}
            />
          </Form.Item>

          <Form.Item
            label="Math Level"
            name="math_lvl"
            rules={[{ required: true, message: 'Math level is required.' }]}
          >
            <Input
              type="number"
              name="math_lvl"
              value={formData.math_lvl}
              onChange={e => handleChange(e)}
            />
          </Form.Item>

          <Form.Item
            label="Reading Level"
            name="reading_lvl"
            rules={[{ required: true, message: 'Reading level is required.' }]}
          >
            <Input
              type="number"
              name="reading_lvl"
              value={formData.reading_lvl}
              onChange={e => handleChange(e)}
            />
          </Form.Item>

          <Form.Item
            label="School Level"
            name="school_lvl"
            rules={[{ required: true, message: 'School level is required.' }]}
          >
            <Input
              type="number"
              name="school_lvl"
              value={formData.school_lvl}
              onChange={e => handleChange(e)}
            />
          </Form.Item>
          <Form.Item
            label="Academic Description"
            name="academic_description"
            rules={[
              {
                required: true,
                message: 'Academic description level is required.',
              },
            ]}
          >
            <Input.TextArea
              rows={2}
              type="text"
              name="academic_description"
              value={formData.academic_description}
              onChange={e => handleChange(e)}
            />
          </Form.Item>
          <Form.Item
            label="Support Needed"
            name="support_needed"
            rules={[
              { required: true, message: 'Support needed level is required.' },
            ]}
          >
            <Input.TextArea
              rows={2}
              type="text"
              name="support_needed"
              value={formData.support_needed}
              onChange={e => handleChange(e)}
            />
          </Form.Item>
          <h4>Availability</h4>
          <Form.Item
            label="Timezone"
            name="time_zone"
            rules={[{ required: true, message: 'Timezone is required.' }]}
          >
            <Input
              type="text"
              name="time_zone"
              fields={formData.availability.time_zone}
              onChange={e =>
                setFormData({
                  ...formData,
                  availability: {
                    ...formData.availability,
                    time_zone: e.target.value,
                  },
                })
              }
            />
          </Form.Item>
          <Form.Item
            label="As early as"
            name="as_early_as"
            rules={[{ required: true, message: 'Start time is required.' }]}
          >
            <Input
              type="text"
              name="as_early_as"
              fields={formData.availability.as_early_as}
              onChange={e =>
                setFormData({
                  ...formData,
                  availability: {
                    ...formData.availability,
                    as_early_as: e.target.value,
                  },
                })
              }
            />
          </Form.Item>
          <Form.Item
            label="As late as"
            name="as_late_as"
            rules={[{ required: true, message: 'End time is required.' }]}
          >
            <Input
              type="text"
              name="as_late_as"
              fields={formData.as_late_as}
              onChange={e =>
                setFormData({
                  ...formData,
                  availability: {
                    ...formData.availability,
                    as_late_as: e.target.value,
                  },
                })
              }
            />
          </Form.Item>
          <Form.Item label="Methods" name="method">
            <Checkbox.Group
              name="methods"
              values={currentMentee.availability.methods}
              onChange={e => handleCheckboxChange(e)}
            >
              <Checkbox value="phone">Phone</Checkbox>
              <Checkbox value="email">Email</Checkbox>
              <Checkbox value="twitter">Twitter</Checkbox>
              <Checkbox value="facebook">Facebook</Checkbox>
              <Checkbox value="wechat">WeChat</Checkbox>
              <Checkbox value="mail">Mail</Checkbox>
            </Checkbox.Group>
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <h4>Additional Information</h4>
          <Form.Item
            name={0}
            rules={[{ required: true, message: 'Field is required.' }]}
          >
            <TextArea
              rows={2}
              placeholder="My favorite thing to do in my free time is.."
              onChange={handleQuestionsChange}
            />
          </Form.Item>
          <Form.Item
            name={1}
            rules={[{ required: true, message: 'Field is required.' }]}
          >
            <TextArea
              rows={2}
              placeholder="When I grow up, I want to be.."
              onChange={handleQuestionsChange}
            />
          </Form.Item>
          <Form.Item
            name={2}
            rules={[{ required: true, message: 'Field is required.' }]}
          >
            <TextArea
              rows={2}
              placeholder="Goals and Dreams Notes.."
              onChange={handleQuestionsChange}
            />
          </Form.Item>
          <Form.Item
            name={3}
            rules={[{ required: true, message: 'Field is required.' }]}
          >
            <TextArea
              rows={2}
              placeholder="Personal Struggles Notes.."
              onChange={handleQuestionsChange}
            />
          </Form.Item>
          <Form.Item
            name={4}
            rules={[{ required: true, message: 'Field is required.' }]}
          >
            <TextArea
              rows={2}
              placeholder="Other interests/hobbies.."
              onChange={handleQuestionsChange}
            />
          </Form.Item>
          <Form.Item
            name={5}
            rules={[{ required: true, message: 'Field is required.' }]}
          >
            <TextArea
              rows={2}
              placeholder="Skills Notes.."
              onChange={handleQuestionsChange}
            />
          </Form.Item>
          <Form.Item
            name={6}
            rules={[{ required: true, message: 'Field is required.' }]}
          >
            <TextArea
              rows={2}
              placeholder="Family Notes.."
              onChange={handleQuestionsChange}
            />
          </Form.Item>
          <Form.Item
            name={7}
            rules={[{ required: true, message: 'Field is required.' }]}
          >
            <TextArea
              rows={2}
              placeholder="Other Notes.."
              onChange={handleQuestionsChange}
            />
          </Form.Item>
          <Form.Item
            name={8}
            rules={[{ required: true, message: 'Field is required.' }]}
          >
            <TextArea
              rows={2}
              placeholder="Admin Notes.."
              onChange={handleQuestionsChange}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" loading={loading} htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

const mapStateToProps = state => {
  return {
    isloading: state.headmasterReducer.isLoading,
    message: state.headmasterReducer.message,
  };
};

export default connect(mapStateToProps, {
  fetchMenteeProfileAction,
  editMenteeProfileAction,
})(EditMenteeForm);