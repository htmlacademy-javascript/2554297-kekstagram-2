const getMeetingData = (start, end, meeting, time) => {

  const anotherStart = start.split(':');
  const anotherEnd = end.split(':');
  const anotherMeeting = meeting.split(':');

  if ((parseInt(anotherMeeting[0], 10)) < (parseInt(anotherStart[0], 10)) || (parseInt(anotherMeeting[0], 10)) > (parseInt(anotherEnd[0], 10))) {
    return false;
  }

  const timeMeeting = (parseInt(anotherEnd[0] - anotherMeeting[0], 10)) * 60 - (parseInt(anotherMeeting[1], 10)) + (parseInt(anotherEnd[1], 10));
  return (timeMeeting >= time);
};

getMeetingData('08:00', '17:30', '14:00', 90); // true
getMeetingData('8:0', '10:0', '8:0', 120); // true
getMeetingData('08:00', '14:30', '14:00', 90); // false
getMeetingData('14:00', '17:30', '08:0', 90); // false
getMeetingData('8:00', '17:30', '08:00', 900); // false
