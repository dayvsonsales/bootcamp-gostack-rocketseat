import React, { useEffect, useState, useMemo, useRef } from 'react';

import { toast } from 'react-toastify';

import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { MdNotifications } from 'react-icons/md';
import api from '~/services/api';
import {
  Container,
  Badge,
  NotificationList,
  Notification,
  Scroll,
} from './styles';

export default function Notifications() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const hasUnread = useMemo(() => {
    return (
      notifications.filter((notification) => notification.read === false)
        .length > 0
    );
  }, [notifications]);

  async function loadNotifications() {
    const response = await api.get('notifications');

    // eslint-disable-next-line
    response.data.map((notification) => {
      notification.createdAt = parseISO(notification.createdAt);
      notification.parsed_created_at = formatDistance(
        notification.createdAt,
        new Date(),
        {
          addSuffix: true,
          locale: pt,
        }
      );
    });

    setNotifications(response.data);
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setVisible(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    loadNotifications();

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  function handleToggleVisible() {
    console.tron.log(visible);
    setVisible(!visible);
  }

  async function handleSetReadNotification(notification) {
    try {
      await api.put(`/notifications/${notification._id}`);
      loadNotifications();
    } catch (e) {
      toast.error('Não foi possível concluir a operação');
    }
  }

  return (
    <Container>
      <Badge ref={ref} onClick={handleToggleVisible} hasUnread={hasUnread}>
        <MdNotifications color="#7159c1" size={20} />
      </Badge>

      <NotificationList visible={visible}>
        <Scroll>
          {notifications.map((notification) => (
            <Notification key={notification._id} unread={!notification.read}>
              <p>{notification.content}</p>
              <time>{notification.parsed_created_at}</time>
              {!notification.read && (
                <button
                  type="button"
                  onClick={() => handleSetReadNotification(notification)}
                >
                  Marcar como lida
                </button>
              )}
            </Notification>
          ))}
        </Scroll>
      </NotificationList>
    </Container>
  );
}
