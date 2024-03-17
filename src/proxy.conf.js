var defaultTarget = 'http://productmanager-env.eba-g9wxi3vp.eu-central-1.elasticbeanstalk.com';
module.exports = [
{
   context: ['/product/**'],
   target: defaultTarget,
   secure: false,
}
];

