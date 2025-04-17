import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateName } from './userSlice';
import { useNavigate, useNavigation } from 'react-router-dom';
import Button from '../../UI/Button';

function CreateUser() {
  const [username, setUsername] = useState('');
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = navigation.state === 'submitting';
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    if (!username) return;

    dispatch(updateName(username));
    navigate('/menu');
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-yellow-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        className="w-72 input mb-8"
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {username !== '' && (
        <div>
          <Button type={'primary'} disabled={isSubmitting}>
            {isSubmitting ? 'submitting...' : 'Order'}
          </Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
