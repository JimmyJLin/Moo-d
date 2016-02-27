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
