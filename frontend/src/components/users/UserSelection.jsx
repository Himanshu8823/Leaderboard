import Button from '../ui/Button';
import Card from '../ui/Card';

const UserSelection = ({ users, selectedUser, onSelectUser, className }) => {
  return (
    <Card className={className}>
      <h2 className="text-xl font-semibold mb-4">Select User</h2>
      {/* Render a button for each user */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {users.map(user => (
          <Button
            key={user._id}
            // Highlight the selected user
            variant={selectedUser === user._id ? 'primary' : 'outline'}
            onClick={() => onSelectUser(user._id)}
            className="text-center"
          >
            {user.name}
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default UserSelection;