import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export const useLogout = () => {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async () => {
            // โค้ดยิง API เพื่อ Logout เช่น axios.post('/api/auth/logout')
            return new Promise((resolve) => setTimeout(resolve, 1000));
        },
        onSuccess: () => {
            router.push("/login");
        },
        onError: (error) => {
            // จัดการกรณีเกิดข้อผิดพลาด
            console.error("Logout failed", error);
        }
    });

    const handleConfirmLogout = () => {
        Swal.fire({
            title: "ต้องการออกจากระบบ ใช่หรือไม่?",
            icon: "warning",
            theme: 'dark',
            background: '#222831',
            showCancelButton: true,
            confirmButtonColor: "#BF092F",
            cancelButtonColor: "#393E46",
            confirmButtonText: "ออกจากระบบ",
            cancelButtonText: "ยกเลิก",
        }).then((result) => {
            if (result.isConfirmed) {
                mutation.mutate();
            }
        });
    };

    return {
        handleConfirmLogout,
        isLoggingOut: mutation.isPending,
        error: mutation.error
    };
};