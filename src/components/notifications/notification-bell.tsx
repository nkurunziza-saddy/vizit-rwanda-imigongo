import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  ShoppingCart,
  Calendar,
  User,
  AlertCircle,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type {
  Notification,
  NotificationType,
} from "@/schemas/notification.schema";

interface NotificationBellProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDelete: (id: string) => void;
  onViewAll: () => void;
}

const notificationIcons: Record<NotificationType, React.ReactNode> = {
  booking_confirmed: <Calendar className="h-4 w-4 text-green-500" />,
  booking_cancelled: <AlertCircle className="h-4 w-4 text-red-500" />,
  payment_received: <ShoppingCart className="h-4 w-4 text-blue-500" />,
  payment_failed: <AlertCircle className="h-4 w-4 text-red-500" />,
  vendor_approved: <Check className="h-4 w-4 text-green-500" />,
  vendor_rejected: <AlertCircle className="h-4 w-4 text-red-500" />,
  new_message: <User className="h-4 w-4 text-blue-500" />,
  system: <AlertCircle className="h-4 w-4 text-yellow-500" />,
};

export function NotificationBell({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete,
  onViewAll,
}: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const recentNotifications = notifications.slice(0, 10);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(id);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "relative",
        )}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs rounded"
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </Badge>
        )}
      </PopoverTrigger>
      <PopoverContent
        className="w-80 p-0 rounded border-foreground/20"
        align="end"
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h4 className="font-semibold">Notifications</h4>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onMarkAllAsRead}
              className="h-auto py-1 px-2 text-xs"
            >
              <CheckCheck className="h-3 w-3 mr-1" />
              Mark all read
            </Button>
          )}
        </div>

        <ScrollArea className="h-[300px]">
          {recentNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
              <Bell className="h-8 w-8 mb-2 opacity-50" />
              <p className="text-sm">No notifications</p>
            </div>
          ) : (
            <div className="divide-y">
              {recentNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 hover:bg-muted/50 transition-colors cursor-pointer ${
                    !notification.isRead ? "bg-muted/30" : ""
                  }`}
                  onClick={() => {
                    if (!notification.isRead) {
                      onMarkAsRead(notification.id);
                    }
                    setIsOpen(false);
                  }}
                >
                  <div className="flex gap-3">
                    <div className="mt-0.5">
                      {notificationIcons[notification.type]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-1">
                        {notification.title}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDistanceToNow(new Date(notification.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1">
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-primary rounded" />
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 opacity-0 group-hover:opacity-100"
                        onClick={(e) => handleDelete(notification.id, e)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <Separator />

        <div className="p-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full"
            onClick={() => {
              onViewAll();
              setIsOpen(false);
            }}
          >
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default NotificationBell;
