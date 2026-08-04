import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import ContentEditor from './ContentEditor';
import Select from '../../Select';
import Input from '../../Input';
import Button from './Button';
import appwriteService from '../../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

export default function PostForm({ post }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.slug || '',
      content: post?.content || '',
      status: post?.status || 'active',
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [submitting, setSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(
    post?.featuredImageUrl || post?.featuredImage || null
  );

  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string') {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s-]+/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
    }
    return '';
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title' && !post) {
        setValue('slug', slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue, post]);

  const onImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const clearImage = () => {
    setPreviewUrl(null);
    setValue('image', undefined);
  };

  const submit = async (data) => {
    if (!userData?._id) {
      toast.error('Please log in to create a post');
      navigate('/login');
      return;
    }

    const plain = (data.content || '').replace(/<[^>]*>/g, '').trim();
    if (!plain) {
      toast.error('Please write some content for your post');
      return;
    }

    if (!data.slug?.trim()) {
      toast.error('Slug is required');
      return;
    }

    setSubmitting(true);
    try {
      if (post) {
        const isOwner =
          String(post.userid) === String(userData._id) || post.name === userData.name;
        if (!isOwner) {
          toast.error('You are not the owner of this post');
          return;
        }

        let featuredImage = post.featuredImage;
        let featuredImageUrl = post.featuredImageUrl;

        if (data.image?.[0]) {
          const file = await appwriteService.uploadFile(data.image[0]);
          if (file) {
            if (post.featuredImage) {
              await appwriteService.deleteFile(post.featuredImage).catch(() => {});
            }
            featuredImage = file.$id;
            featuredImageUrl = file.url;
          }
        }

        const dbPost = await appwriteService.updatePost(post.slug, {
          title: data.title.trim(),
          content: data.content,
          status: data.status,
          featuredImage,
          featuredImageUrl,
        });

        if (dbPost?.slug) {
          navigate(`/post/${dbPost.slug}`);
        }
      } else {
        let featuredImage = null;
        let featuredImageUrl = null;

        if (data.image?.[0]) {
          const file = await appwriteService.uploadFile(data.image[0]);
          if (!file?.$id && !file?.url) {
            toast.error(
              'Image upload failed. Remove the image and publish without one, or check Cloudinary env vars.'
            );
            return;
          }
          featuredImage = file.$id;
          featuredImageUrl = file.url;
        }

        const dbPost = await appwriteService.createPost({
          title: data.title.trim(),
          slug: data.slug.trim(),
          content: data.content,
          status: data.status || 'active',
          featuredImage,
          featuredImageUrl,
        });

        if (dbPost?.slug) {
          navigate(`/post/${dbPost.slug}`);
        } else {
          toast.error('Post created but no slug returned');
        }
      }
    } catch (err) {
      console.error('Post submit failed:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="md:flex md:px-4 flex-wrap">
      <div className="md:w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4 dark:bg-black dark:text-white"
          {...register('title', { required: 'Title is required' })}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mb-2">{errors.title.message}</p>
        )}

        <Input
          label="Slug :"
          placeholder="url-friendly-slug"
          className="mb-4 dark:bg-black dark:text-white"
          {...register('slug', { required: 'Slug is required' })}
          onInput={(e) => {
            setValue('slug', slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
          disabled={!!post}
        />
        {errors.slug && (
          <p className="text-red-500 text-sm mb-2">{errors.slug.message}</p>
        )}

        <ContentEditor
          label="Content :"
          name="content"
          control={control}
          defaultValue={post?.content || ''}
          placeholder="Write your article here. Plain text or simple HTML is fine."
          rows={16}
        />
      </div>

      <div className="md:w-1/3 px-2">
        <div className="mb-1">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200 pl-1">
            Featured Image{' '}
            <span className="text-gray-400 font-normal">(optional)</span>
          </span>
        </div>
        <Input
          type="file"
          className="mb-2 dark:bg-black dark:text-white"
          accept="image/png,image/jpg,image/jpeg,image/gif,image/webp"
          {...register('image', {
            required: false,
            onChange: onImageChange,
          })}
        />

        {previewUrl && (
          <div className="w-full mb-4 relative">
            <img
              src={
                typeof previewUrl === 'string' && previewUrl.startsWith('blob:')
                  ? previewUrl
                  : appwriteService.getFilePreview(previewUrl)
              }
              alt="preview"
              className="rounded-lg max-h-48 object-cover w-full"
            />
            {!post && (
              <button
                type="button"
                onClick={clearImage}
                className="mt-2 text-sm text-red-500 hover:underline"
              >
                Remove image
              </button>
            )}
          </div>
        )}

        <Select
          options={['active', 'inactive']}
          label="Status"
          className="mb-4 dark:bg-black dark:text-white"
          {...register('status', { required: true })}
        />

        <Button
          type="submit"
          bgColor={post ? 'bg-orange-500' : undefined}
          className="w-full disabled:opacity-60"
          disabled={submitting}
        >
          {submitting ? (post ? 'Updating…' : 'Publishing…') : post ? 'Update' : 'Submit'}
        </Button>

        <p className="text-xs text-gray-400 mt-3">
          Only title, slug, and content are required. Image is optional.
        </p>

        {!userData?._id && (
          <p className="text-sm text-red-500 mt-2">You must be logged in to publish.</p>
        )}
      </div>
    </form>
  );
}