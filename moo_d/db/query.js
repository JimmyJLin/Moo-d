select profile.profile_id profile_id, profile.name profile_name, activity.name activity_name, emotion.name emotion_name
from profile
left join emotion
on profile.emotion_id = emotion.emotion_id
left join activity
on profile.activity_id = activity.activity_id
order by profile.profile_id;


select profile.profile_id profile_id, profile.name profile_name, activity.name activity_name, emotion.name emotion_name
from profile
left join emotion
on profile.emotion_id = emotion.emotion_id
left join activity
on profile.activity_id = activity.activity_id
WHERE profile.profile_id = $1;

select profile.profile_id profile_id, profile.name profile_name, activity.name activity_name, emotion.name emotion_name from profile left join emotion on profile.emotion_id = emotion.emotion_id left join activity on profile.activity_id = activity.activity_id WHERE profile.profile_id = $1;

// login
SELECT *
FROM profile
WHERE email LIKE ($1)

// select one
select profile.profile_id profile_id, profile.name profile_name, activity.name activity_name, emotion.name emotion_name
from profile
left join emotion
on profile.emotion_id = emotion.emotion_id
left join activity
on profile.activity_id = activity.activity_id
WHERE profile.profile_id = $1

select profile.email, profile.profile_id profile_id, profile.name profile_name, activity.name activity_name, emotion.name emotion_name
from profile
left join emotion
on profile.emotion_id = emotion.emotion_id
left join activity
on profile.activity_id = activity.activity_id
WHERE profile.email LIKE ($1)


select profile.email, profile.profile_id profile_id, profile.name profile_name, activity.name activity_name, emotion.name emotion_name from profile left join emotion on profile.emotion_id = emotion.emotion_id left join activity on profile.activity_id = activity.activity_id WHERE profile.email LIKE ($1)

SELECT *
FROM profile
left join emotion
on profile.emotion_id = emotion.emotion_id
left join activity
on profile.activity_id = activity.activity_id
WHERE email LIKE ($1)

SELECT profile.email, profile.profile_id profile_id, profile.name profile_name, activity.name activity_name, emotion.name emotion_name FROM profile left join emotion on profile.emotion_id = emotion.emotion_id left join activity on profile.activity_id = activity.activity_id WHERE email LIKE ($1)
