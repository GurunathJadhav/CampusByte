const sizes = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl',
};

// Generate a consistent color based on name
const getColorFromName = (name) => {
  const colors = [
    'bg-primary-500',
    'bg-secondary-500',
    'bg-accent-500',
    'bg-rose-500',
    'bg-cyan-500',
    'bg-orange-500',
    'bg-teal-500',
    'bg-indigo-500',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

// Get initials from name
const getInitials = (name) => {
  if (!name) return '?';
  const words = name.trim().split(' ');
  if (words.length === 1) return words[0].charAt(0).toUpperCase();
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
};

const Avatar = ({
  src,
  name = '',
  size = 'md',
  className = '',
  status,
  ...props
}) => {
  const initials = getInitials(name);
  const bgColor = getColorFromName(name);

  return (
    <div className={`relative inline-flex ${className}`} {...props}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={`
            ${sizes[size]}
            rounded-full object-cover
            ring-2 ring-white dark:ring-slate-800
          `}
        />
      ) : (
        <div
          className={`
            ${sizes[size]}
            ${bgColor}
            rounded-full
            flex items-center justify-center
            font-semibold text-white
            ring-2 ring-white dark:ring-slate-800
          `}
        >
          {initials}
        </div>
      )}
      {status && (
        <span
          className={`
            absolute bottom-0 right-0
            w-3 h-3 rounded-full
            ring-2 ring-white dark:ring-slate-800
            ${status === 'online' ? 'bg-green-500' : ''}
            ${status === 'offline' ? 'bg-slate-400' : ''}
            ${status === 'busy' ? 'bg-red-500' : ''}
            ${status === 'away' ? 'bg-amber-500' : ''}
          `}
        />
      )}
    </div>
  );
};

// Avatar Group Component
const AvatarGroup = ({ avatars = [], max = 4, size = 'md' }) => {
  const displayedAvatars = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <div className="flex -space-x-2">
      {displayedAvatars.map((avatar, index) => (
        <Avatar
          key={index}
          src={avatar.src}
          name={avatar.name}
          size={size}
          className="border-2 border-white dark:border-slate-800"
        />
      ))}
      {remaining > 0 && (
        <div
          className={`
            ${sizes[size]}
            bg-slate-200 dark:bg-slate-700
            rounded-full
            flex items-center justify-center
            font-semibold text-slate-600 dark:text-slate-300
            ring-2 ring-white dark:ring-slate-800
          `}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
};

export { Avatar, AvatarGroup };
export default Avatar;
